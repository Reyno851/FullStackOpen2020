import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, loggedInUser, allBlogs, setBlogs }) => {
  const dispatch = useDispatch()
  const [detailsVisible, setDetailsVisible] = useState(false)

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }
  
  const toggleView = () => {
    setDetailsVisible(!detailsVisible)
  }

  const deleteBlog = () => { // 'blog' in this function refers to the 'blog' prop received
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) { 
      dispatch(removeBlog(blog.id))
      // blogService
      //   .remove(blog.id)
      //   .then(
      //     setBlogs(
      //       allBlogs.filter(b => b.id !== blog.id) // b refers to the blogs which we are mapping from the current allBlogs list
      //     )
      //   )
    }  
  }
  return(
    <tr className="blogEntry" /*style={blogStyle}*/>
      <td className="defaultView"> 
        <Link to={`/blogs/${blog.id}`}> {blog.title} by {blog.author}  </Link>
        {/*<button onClick={toggleView}> {detailsVisible ? 'hide' : 'view'} </button>*/}
      </td>
      
      <td className="sectionDisplayedOnClick" /*style={{ display : detailsVisible ? '' : 'none' }}*/> 
        Added by {blog.user.name}
        <br/>
        <button id='removeButton' style={{ display: loggedInUser.id === blog.user.id ? '' : 'none' }} onClick={deleteBlog}> remove </button>
      </td>

      
    </tr>
  )
}

export default Blog
