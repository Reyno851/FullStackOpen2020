import React, { useState } from 'react'
import {
    useHistory
} from 'react-router-dom'
import  { useField } from '../hooks/index'

const CreateNew = (props) => {
    const history = useHistory()
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')
  
    const handleSubmit = (e) => {
      e.preventDefault()

      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      history.push('/')
    }
    
    const handleReset = (e) => {
      e.preventDefault()
      console.log('working')
      content.reset()
      author.reset()
      info.reset()
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type="submit">create</button> <button type="reset">reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew
  