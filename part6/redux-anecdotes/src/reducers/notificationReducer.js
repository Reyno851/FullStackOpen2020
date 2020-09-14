const notificationAtStart = [
    'This is the initial notification'
]

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type) {
  
      case 'SHOW_NOTIF': 
        return action.notification
  
      default: 
        return state
    }
    
}

export const notificationChange = notification => {
  return async dispatch => {
    
    dispatch({
      type: 'SHOW_NOTIF',
      notification
    })
  }
}

// export const createAnecdote = data => {
//   return async dispatch => {
//     const newAnecdote = await anecdoteService.createNew(data)
//     dispatch({
//       type: 'NEW_ANECDOTE',
//       data: newAnecdote
//     })
//   }
// }

export default notificationReducer