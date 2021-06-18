import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'


const CommentForm = ({ blog }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const addCommentToBlog = (event) => {
        event.preventDefault()
        console.log('Commented!')
        dispatch(addComment(blog, comment))
        setComment('')
    }

    const handleCommentChange = (event) => {
        console.log(event.target.value)
        setComment(event.target.value)
    }

    return (
    <form onSubmit={addCommentToBlog}>

        <input id='comment' value={comment} onChange={handleCommentChange} />

        <button id='submit-button' type="submit">add comment</button>

      </form>  
    )
}

export default CommentForm