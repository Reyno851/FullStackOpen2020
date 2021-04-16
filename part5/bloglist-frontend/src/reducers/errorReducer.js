export const errorReducer = (state = false, action) => {
    switch (action.type) {
      case 'SET_ERROR_STATE':
        return action.errorState
      default:
        return state
    }
}

export const errorStateChange = errorState => {
    return {
      type: 'SET_ERROR_STATE',
      errorState,
    }
}