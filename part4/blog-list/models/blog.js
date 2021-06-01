const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // ref is important for the use of populate() method
    // Database does not actually know that the ids stored in the user field of blog
    // are referencing documents in the user collection
    // ref name is defined in mongoose.model() in the user schema js file 
  },
  comments: {
    type: Array
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
