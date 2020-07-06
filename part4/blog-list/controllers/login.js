const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username }) // Search for username in database
  const passwordCorrect = user === null 
    ? false // If user is not found (ie user === null) return passwordCorrect as false
    : await bcrypt.compare(body.password, user.passwordHash) // Passwords not saved to database, but hashes. So we use bcrypt.compare to check for correct password

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ // 401 error code: unauthorised
      error: 'invalid username or password'
    })
  }

  const userForToken = { 
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET) // If password and username is correct, create token

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter