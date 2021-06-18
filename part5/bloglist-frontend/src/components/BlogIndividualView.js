import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const BlogIndividualView = ({ blogs }) => {
    const id = useParams().id
    const dispatch = useDispatch()
    const blog = blogs.find(b => b.id === id)

    const increaseLike = () => {
        dispatch(addLike(blog))
      }

    if (!blog) { // Use conditional rendering here to prevent page from rendering before blog is loaded into redux state
        return null
    }

    return ( // Transfer functionality from Blog.js to here
        <div> 
            <h1> {blog.title} </h1>
            <a href={blog.url}>{blog.url}</a>
            <br/>
            <span id='likes'> {blog.likes} </span>
            <button onClick={increaseLike}>like</button>
            <br/>
            added by {blog.user.name}
            <br/>
            <h3> comments </h3>
            <CommentForm blog={blog}/>
            <ul>
                {blog.comments.map((comment, index) => { // Use index as 2nd parameter so that there is a unique key for each comment
                    return <li key={index} > {comment} </li>
                })}
            </ul>
        </div>
    ) 
}

export default BlogIndividualView