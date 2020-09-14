const filterAtStart = {
  filterState: 'ALL',
  filterInput: ''
}

const filterReducer = (state = filterAtStart, action) => {
    switch (action.type) {
      case 'SET_FILTER_STATE':
        state.filterState = action.filterState

      case 'SET_FILTER_INPUT':
        state.filterInput = action.userInput

      default:
        return state
    }
  }

export const filterStateChange = (filterState) => { // Action creator for changing filter state
    return {
        type: 'SET_FILTER_STATE',
        filterState
    }
}

export const setFilterInput = (userInput) => { // Action creator for changing filter input
  return {
    type: 'SET_FILTER_INPUT',
    userInput
  }
}


export default filterReducer