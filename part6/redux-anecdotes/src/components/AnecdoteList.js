import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer' 
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
    // useSelector receives a function as a parameter 
    // and selects from the state of the store
      if (state.filter.filterState === 'ALL') {
        return state.anecdotes
      } else if (state.filter.filterState  === 'FILTERED') {
        return state.anecdotes.filter(anecdote => 
          anecdote.content.toLowerCase().includes(state.filter.filterInput.toLowerCase())
        )
        
      }
 
    })

    const dispatch = useDispatch() // useDispatch-hook provides any React component access 
    // to the dispatch-function of the redux-store defined in index.js

    const vote = (anecdote) => {
        dispatch(incrementVote(anecdote))

        const message = 'you voted \'' + anecdote.content + '\''
        dispatch(notificationChange(message))
        setTimeout(() => {  
          dispatch(notificationChange(null));
        }, 5000);
        
    }

    return (
        anecdotes
        .sort((a,b) => {
          return b.votes - a.votes // Sort blogs according to number of likes in descending order
        })
        .map(anecdote => // Using store.getState().map() does not work here. Use useSelector hook instead
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )
    )
}

export default AnecdoteList