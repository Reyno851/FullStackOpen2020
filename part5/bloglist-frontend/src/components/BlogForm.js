import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [newBlog, setNewBlog] = useState('')

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    console.log(event.target.value)
    setURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ // Future work: create notification when any one field is missing
      title: title,
      author: author,
      url: url,
      user: user
    })

    setTitle('')
    setAuthor('')
    setURL('')
    setNewBlog('')
  }

  return (
    <form onSubmit={addBlog}>
      <label>
        title:
      </label>
      <input id='title' value={title} onChange={handleTitleChange}/>

      <br/>

      <label>
        author:
      </label>
      <input id='author' value={author} onChange={handleAuthorChange}/>

      <br/>

      <label>
        url:
      </label>
      <input id='url' value={url} onChange={handleURLChange}/>  

      <br/>

      <button id='submit-button' type="submit">create</button>
    </form>  
)
}

export default BlogForm