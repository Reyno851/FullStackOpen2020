const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  name: {
    type: String
  },
  passwordHash: String,
  blogs: [ // ids of blogs are stored within the user document as an array of Mongo ids
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' // ref is important for the use of populate() method
      // ref name is defined in mongoose.model() in the blog schema js file 
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema) 

module.exports = User