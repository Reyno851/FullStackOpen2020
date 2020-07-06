import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedInUser, allBlogs, setBlogs, addLikeForTesting }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  //console.log(loggedInUser.id, blog.user)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const toggleView = () => {
    setDetailsVisible(!detailsVisible)
  }

  const addLike = () => {
    addLikeForTesting()
    const blogWithAddedLikes = { ...blog, likes: blog.likes + 1 } // Use dot operator to create exact same blog, but only change the likes key
    
    blogService
      .update(blog.id, blogWithAddedLikes)
      .then(response => { // Backend responds with the updated blog
        console.log('response: ', response)
        // ID of blog with updated likes is different from original. Therefore, we can replace the updated blog using ID
        setBlogs(allBlogs.map(blog => blog.id !== response.id ? blog : response)) 
      })
  }

  const removeBlog = () => { // 'blog' in this function refers to the 'blog' prop received
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) { 
      blogService
        .remove(blog.id)
        .then(
          setBlogs(
            allBlogs.filter(b => b.id !== blog.id) // b refers to the blogs which we are mapping from the current allBlogs list
          )
        )
    }  
  }


  return (
    <div className="blogEntry" style={blogStyle}>
      <div className="defaultView"> 
        {blog.title} {blog.author}
        <button onClick={toggleView}> {detailsVisible ? 'hide' : 'view'} </button>
      </div>
      
      <div className="sectionDisplayedOnClick" style={{ display : detailsVisible ? '' : 'none' }}> 
        {blog.url}
        <br/>
        <span id='likes'> {blog.likes} </span>
        <button onClick={addLike}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button id='removeButton' style={{ display: loggedInUser.id === blog.user.id ? '' : 'none' }} onClick={removeBlog}> remove </button>
      </div>

      
    </div>
  )
}

export default Blog
