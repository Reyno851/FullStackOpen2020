const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../App');
const api = supertest(app); // Wrap app in supertest() to form a "superagent" object
const Blog = require('../models/blog')

beforeEach(async () => { // Before each test .. 
  jest.setTimeout(10000); // Default jest timeout is 5000ms. Increase it to 10000 to prevent errors if loading each test takes too long
  await Blog.deleteMany({}) // Clear out database
  console.log('cleared')

  for (let blog of helper.initialBlogs) { // Use for loop to ensure that promises are resolved in order
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
  
  // This ensures that database is in the same state before every test is run
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length)
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifer of blog posts is named id', async () => {
  const blogsInDb = await helper.blogsInDb()
  blogsInDb.map(blog => {
    expect(blog.id).toBeDefined();
  })
})

test('a specific blog title is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title) // Create an array containing the title of every blog returned by the API

  expect(titles).toContain( // toContain method is used for checking that the title given to it as a parameter 
    'Second Blog Post'      // is in the list of blogs returned by the API
  )
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Third Blog Post',
    author: 'ReyDK',
    url: 'website.com',
    likes: 333
  }

  await api
    .post('/api/blogs') // Note: .set() has to be called AFTER .post(). Token is obtained when user logs in
    .set({ Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjVlZTdiMDFkMDViZWFkNDYyNGRmZmY0NCIsImlhdCI6MTU5MjMyNTk5NX0.kXZNo93tmPd9Zo7DP6sw-KLzxbqd7Cdtyi3Ww2ho2t4' })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain( // Test whether new blog post's title is in the new blogs returned
    'Third Blog Post'
  )
})

test('creation of blog fails with proper status code 401 if token is not provided', async () => {
  const newBlog = {
    title: 'Third Blog Post',
    author: 'ReyDK',
    url: 'website.com',
    likes: 333
  }

  await api
    .post('/api/blogs') 
    .send(newBlog)
    .expect(401)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain( // Test whether new blog post's title is in the new blogs returned
    'Third Blog Post'
  )
})

test('blog without title and url responds with 400 Bad Request and is not added', async () => {
  const newBlog = {
    author: 'ReyDK',
    likes: 33323
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400) // Expect server to respond with 400 Bad Request

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length) // Expect total number of blogs to be unchanged
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('blog without likes defaults likes to 0', async () => {
  const newBlog = {
    title: 'Another Blog Post',
    author: 'ReyDK',
    url: 'website.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const postedBlog = blogsAtEnd[blogsAtEnd.length - 1]
  expect(postedBlog.likes).toEqual(0)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[1]
  const newBlogUpdate = {
    title: 'Second Blog Post',
    author: 'ReyDK',
    url: 'website.com',
    likes: '3211'
  }
  
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlogUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[1].likes).toEqual(3211)
})

afterAll(() => {
  // After all tests are completed, close database connection used by Mongoose
  mongoose.connection.close();
});
