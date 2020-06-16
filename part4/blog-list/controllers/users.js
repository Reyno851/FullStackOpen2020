const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { likes: 1, title: 1, author: 1, url: 1 }) 
    // 'blogs' given as a parameter to populate() defines that the ids referencing blog objects
    // in the blogs field of the user document will be replaced by the referenced blog documents.
    // Object after 'blogs' further specifies the fields we want to see when we GET all users
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => { // No error handling, all done behind the scene by the express-async-errors library
  const body = request.body

  // Password validators cannot be done in the userSchema as the userSchema only contains hashed password
  // We do the validation in the POST request instead
  if (body.password === undefined) { // Set password to be required here
    return response.status(400).json({ error: 'Password is required' })
  }

  if (body.password.length < 3) { // Set password to have  at least 3 characters here
    return response.status(400).json({ error: 'Password has to be at least 3 characters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash, // Save hashed password to database, not password given itself
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter

