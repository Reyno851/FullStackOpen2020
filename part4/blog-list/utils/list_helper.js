var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogsList) => {
  var sumOfLikes = 0;
  for (let i = 0; i < blogsList.length; i++) {
    sumOfLikes += blogsList[i].likes;
  }
  return sumOfLikes;
};

const favoriteBlog = (blogsList) => {
  var maxLikes = 0;
  for (let j = 0; j < blogsList.length; j++) {
    if (blogsList[j].likes > maxLikes) {
      maxLikes = blogsList[j].likes;
    }
  }

  var blogWithMaxLikes = blogsList.filter(blog=> blog.likes === maxLikes)

  // Return only first entry if there are multiple entires with max likes
  // This also works if there is only one entry, as the [0] extracts out the blog object within the list
  return blogWithMaxLikes[0]; 
};

const mostBlogs = (blogsList) => {
  var blogsListAuthorOrganised = // Use lodash library
    _.chain(blogsList) // use .chain() to create a lodash wrapper instance. MUST unwrap with .value() at end of sequence
      .groupBy('author') // Group blog entries by author
      // .map() takes in function which takes in (value, key) as parameters. These are then transformed into custom "author"
      // and "blogs" keys in new object which holds results of author and their number of blogs. Check console.log() to see
      // results of .map() function
      .map((blogs, author) => ({ author: author, blogs: blogs.length})) 
      .value() // Unwrap lodash wrapper instance

  var maxBlogs = 0 // Initiate max number of blogs
  for (let k = 0; k < blogsListAuthorOrganised.length; k++){ // Loop through collection of objects containing authors and number of blog entries
    var noOfBlogs = blogsListAuthorOrganised[k].blogs // Assign number of blogs in each objecct into variable
    if (noOfBlogs > maxBlogs) { // If number of blogs is larger than max number of blogs, 
      maxBlogs = noOfBlogs // replace maxBlogs.
      var maxBlogsIndex = k; // Get index of max number of blogs
    } 
  }

  // Return object with author that has most number of blogs
  // Note: This only returns ONE author with the most number of blogs. If there are multiple top bloggers,
  // This code will only show the first top blogger in the collection
  return blogsListAuthorOrganised[maxBlogsIndex] 
}

const mostLikes = (blogsList) => { // Similar as mostBlogs function
  var blogsListAuthorOrganised = 
    _.chain(blogsList) 
      .groupBy('author') 
      .map((blogs, author) => { // Difference is calculation of total number of likes
        var noOfLikes = 0;
        for (let ii = 0; ii < blogs.length; ii++) {
          noOfLikes += blogs[ii].likes // Calculate total number of likes for each author using for loop
        }
        return ({ author: author, likes: noOfLikes}) // Map author and total likes into dictionary of a new format
      }) 
      .value() 
  var maxNoOfLikes = 0 // Then get the authro with most likes using another for loop that is similar to the one in mostBlogs
  for (let jj = 0; jj < blogsListAuthorOrganised.length; jj++){ 
    var noOfLikesPerAuthor = blogsListAuthorOrganised[jj].likes
    if (noOfLikesPerAuthor > maxNoOfLikes) {  
      maxNoOfLikes = noOfLikesPerAuthor 
      var maxNoOfLikesIndex = jj; 
    } 
  }

  // Return object with author that has most number of likes
  // Note: This only returns ONE author with the most number of likes. If there are multiple top bloggers,
  // This code will only show the first top blogger in the collection
  return blogsListAuthorOrganised[maxNoOfLikesIndex] 
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
