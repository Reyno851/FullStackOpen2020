import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { errorStateChange } from './reducers/errorReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const errorState = useSelector(state => state.errorState)
  const notification = useSelector(state => state.notification)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs()) 
  }, [dispatch])

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
      dispatch(errorStateChange(true))
      dispatch(
        setNotification('Wrong credentials'), 5
      )
      // setMessage('Wrong credentials')
      // setTimeout(() => {
      //   setMessage(null)
      // }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload() // Refresh page programmatically after logging out
  }


  const addBlog = (blogObject) => {  
    dispatch(createBlog(blogObject))
    dispatch(errorStateChange(false))
    dispatch(
      setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5)
    )
    // blogService
    //   .create(blogObject)
    //   .then(returnedBlog => { // Use .then(). async/await somehow does not work to refresh blogs on browser automatically after addiiton
    //     setBlogs(blogs.concat(returnedBlog))
    //     setErrorState(false)
    //     setMessage(
    //       `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    //     )
    //     setTimeout(() => {
    //       setMessage(null)
    //     }, 5000)
    //   })
    
  }

  const addLikeForTesting = () => {
    console.log('for testing')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification errorState={errorState} notification={notification}/>
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

      <Notification errorState={errorState} notification={notification}/>

      <p> {user.name} logged in </p>
      <button onClick={handleLogout}>logout</button>
      

      <h2> blog app </h2>
        <Togglable buttonLabel='create new'>
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
              return <Blog key={blog.id} blog={blog} loggedInUser={user} allBlogs={blogs} /* setBlogs={setBlogs} */ addLikeForTesting={addLikeForTesting}/>
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