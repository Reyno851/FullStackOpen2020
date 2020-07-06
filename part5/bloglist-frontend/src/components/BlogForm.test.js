// import React, { useState, useEffect } from 'react'
// import '@testing-library/jest-dom/extend-expect'
// import { render, fireEvent } from '@testing-library/react'
// import BlogForm from './BlogForm'
// import blogService from './services/blogs'


// test('form calls the event handler it received as props with the right details when a new blog is called ', () => {
//   const [blogs, setBlogs] = useState([])
//   const [errorState, setErrorState] = useState(false)
//   const [message, setMessage] = useState(null)
//   const [title, setTitle] = useState('')
//   const [author, setAuthor] = useState('')
//   const [url, setURL] = useState('')


//   const user = {
//     username: 'test',
//     name: 'test',
//     passwordHash: 'secretpassword',
//     blogs: [
    
//     ]
//   }
  
//   const addBlog = (blogObject) => {  
//     setTitle('test title')
//     setAuthor('test author')
//     setURL('test URL')

//     blogService
//       .create(blogObject)
//       .then(returnedBlog => { // Use .then(). async/await somehow does not work to refresh blogs on browser automatically after addiiton
//         setBlogs(blogs.concat(returnedBlog))
//         setErrorState(false)
//         setMessage(
//           `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
//         )
//         setTimeout(() => {
//           setMessage(null)
//         }, 5000)
//       })
//       // .catch(error => {
//       //   setErrorState(true)
//       //   setMessage(`${error}`)
//       //   setTimeout(()=>{
//       //     setMessage(null)
//       //   }, 5000)
//       // })
    
//   }

//   var component = render(
//     <BlogForm 
//       createBlog={addBlog}
//       user={user}
//     />
//   )
  
//   const button = component.getByText('create')
//   fireEvent.click(button)
    
  



// })