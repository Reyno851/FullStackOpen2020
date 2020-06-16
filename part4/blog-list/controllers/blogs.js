const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// Endpoints in this file come after route specified in app.use() 
// at line 25 of App.js
// For eg, if /test is specified here as a route, the full route becomes
// /api/blogs/test as /api/blogs is defined at line 25.
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map((blog) => blog.toJSON())) // No error handling, all done behind the scene by the express-async-errors library
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end() // No error handling, all done behind the scene by the express-async-errors library
  }
})

// const getTokenFrom = request => { //getTokenFrom isolates the token from the authorization header
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)  // Validity of the token is checked
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  // const user = await User.findById(body.userId)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON()) // No error handling, all done behind the scene by the express-async-errors library

})

blogsRouter.delete('/:id', async (request, response) => {
  console.log('Undecoded request token: ', request.token)
  const decodedToken = jwt.verify(request.token, process.env.SECRET); // MUST DECODE TOKEN TO RETRIEVE USER ID
  console.log('Decoded token: ', decodedToken)

  const blog = await Blog.findById(request.params.id) // Find blog that matches id of blog we want to delete
  console.log('Blog to be deleted: ', blog)

  if (decodedToken.id.toString() === blog.user.toString()){ // Check if id contained within decoded token matches blog creator's id
    console.log('Id contained within request token matches id of user who created blog to be deleted')
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'token missing or invalid' })
  }

})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog.toJSON())
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
