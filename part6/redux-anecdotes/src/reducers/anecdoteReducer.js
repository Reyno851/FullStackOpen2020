import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

var initialState = anecdotesAtStart.map(asObject)


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

    case 'ADD_VOTE': 
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )

    case 'NEW_ANECDOTE':
      return state.concat(action.data)  

    case 'INIT_ANECDOTES':
      return action.data

    default: 
      return state
  }
  
}

export const incrementVote = (anecdote) => {

  const id = anecdote.id

  return async dispatch => {
    // const anecdoteToChange = await anecdoteService.addVote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: { id }
    })
  }
}


export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
      // { 
      //   content,
      //   id: getId(),
      //   votes: 0
      // } 
      // No need to define id and votes here since backend generates ids for the anecdotes
    })
  }
}



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer