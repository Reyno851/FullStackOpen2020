import React, { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token) // Need to set token when logging in, or else creating blogs would be unauthorised
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
        
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorState(true)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload() // Refresh page programmatically after logging out
  }


  const addBlog = (blogObject) => {  

    blogService
      .create(blogObject)
      .then(returnedBlog => { // Use .then(). async/await somehow does not work to refresh blogs on browser automatically after addiiton
        setBlogs(blogs.concat(returnedBlog))
        setErrorState(false)
        setMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      // .catch(error => {
      //   setErrorState(true)
      //   setMessage(`${error}`)
      //   setTimeout(()=>{
      //     setMessage(null)
      //   }, 5000)
      // })
    
  }

  const addLikeForTesting = () => {
    console.log('for testing')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification errorState={errorState} message={message}/>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>

      <Notification errorState={errorState} message={message}/>

      <p> {user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>
    
      <h2> create new </h2>
      <Togglable buttonLabel='new blog'>
        <BlogForm 
          createBlog={addBlog}
          user={user}
        />
      </Togglable>

      {
        blogs
          .sort((a,b) => {
            return b.likes - a.likes // Sort blogs according to number of likes in descending order
          })
          .map(blog => {
          // console.log('loggedinuser: ', user, 'blog', blog )
            return <Blog key={blog.id} blog={blog} loggedInUser={user} allBlogs={blogs} setBlogs={setBlogs} addLikeForTesting={addLikeForTesting}/>
          }
          
          )
      }

    </div>
  )


  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}


    </div>
  )
}

export default App