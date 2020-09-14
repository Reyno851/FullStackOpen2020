import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch() // useDispatch-hook provides any React component access 
  // to the dispatch-function of the redux-store defined in index.js

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = '' // Clear input field after clicking submit button
    const getId = () => (100000 * Math.random()).toFixed(0) // Generate random ID

    const anecdoteObject = {
        content: content,
        id: getId(),
        votes: 0
      }

    // const newAnecdote = await anecdoteService.createNew(content)
    // dispatch(createAnecdote(newAnecdote))
    dispatch(createAnecdote(anecdoteObject))
    
    // dispatch(notificationChange(`you voted '${content}'`, 10))
    const message = '\'' + content + '\' was added'
    dispatch(notificationChange(message))
    setTimeout(() => {  
      dispatch(notificationChange(null));
    }, 5000); 
  }

  return (
    <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm