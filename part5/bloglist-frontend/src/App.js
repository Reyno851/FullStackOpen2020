import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import './index.css'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { initializeBlogs, createBlog, clearBlogsFromRedux } from './reducers/blogReducer'
import { errorStateChange } from './reducers/errorReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/userBasicInfoReducer'
import UserBasicInfo from './components/UserBasicInfo'
import UserIndividualView from './components/UserIndividualView'
import BlogIndividualView from './components/BlogIndividualView'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const errorState = useSelector(state => state.errorState)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [welcomeMessage, setWelcomeMessage] = useState(null)

  useEffect(() => {
    if (user){ // Make it such that blogs are only initialised if there is a change in user, ie a user is logged in
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [user]) // Don't forget to add the variable as a 2nd argument of useEffect

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(parsedUser))
      // setUser(user)
      blogService.setToken(parsedUser.token)
    }
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token) // Need to set token when logging in, or else creating blogs would be unauthorised
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user.name)
      setWelcomeMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setWelcomeMessage(null)
      }, 10000)

      dispatch(setUser(user))
      //setUser(user)
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
    dispatch(setUser(null))
    dispatch(clearBlogsFromRedux())
    window.localStorage.removeItem('loggedBlogappUser')
    // window.location.reload() // Manual reloading is not needed since user set to null and {user === null && loginForm()} condition is rendered 
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


  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification errorState={errorState} notification={notification}/>
      <Form.Group>
        <Form.Label> username: </Form.Label> 
        <Form.Control 
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label> password: </Form.Label> 
        <Form.Control 
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" type="submit">
            login
        </Button>
      </Form.Group>
    </Form>      
  )

  const blogForm = () => (
    <div>

      <Notification errorState={errorState} notification={notification}/>

      {/* <Link style={{padding : 5}} to="/">Blogs</Link>
      <Link style={{padding : 5}} to="/users">Users</Link>
      <p> {user.name} logged in </p> */}
      
      
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={{padding : 5}} to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={{padding : 5}} to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={{padding : 5}} >{user.name} logged in</em>
                : <Link style={{padding : 5}} to="/login">login</Link>
              }
          </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <button onClick={handleLogout}>Logout</button>

      <Switch>

        <Route path="/blogs/:id">
          <BlogIndividualView blogs={blogs}/>
        </Route>

        <Route path="/users/:id">
          <UserIndividualView />
        </Route>

        <Route path="/users">
          <UserBasicInfo />
        </Route>

        <Route path="/">
          <h1> Blogs </h1>
            <Togglable buttonLabel='create new'>
              <BlogForm 
                createBlog={addBlog}
                user={user}
              />
            </Togglable>
            <Table striped>
              <tbody>
                {
                  blogs
                    .sort((a,b) => {
                      return b.likes - a.likes // Sort blogs according to number of likes in descending order
                    })
                    .map(blog => {
                    // console.log('loggedinuser: ', user, 'blog', blog )
                      return <Blog key={blog.id} blog={blog} loggedInUser={user} allBlogs={blogs} /> /* setBlogs={setBlogs} */ 
                    }
                    
                    )
                }
              </tbody>
            </Table>
            
        </Route>

      </Switch>
      


    </div>
  )


  return (
      <Router>

        <div className="container">
            {(welcomeMessage &&
              <Alert variant="success">
                {welcomeMessage}
              </Alert>
            )}
          {user === null && loginForm()}
          {user !== null && blogForm()}
        </div>

      </Router>

  )
}

export default App