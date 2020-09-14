const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {

    case 'GOOD':
      const incrementedGoodState = {
        ...state,
        good: state.good + 1
      }
      return incrementedGoodState

    case 'OK':
      const incrementedOkState = {
        ...state,
        ok: state.ok + 1
      }
      return incrementedOkState

    case 'BAD':
      const incrementedBadState = {
        ...state,
        bad: state.bad + 1
      }
      return incrementedBadState

    case 'ZERO':
      const zeroedState = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return zeroedState

    default: return state
    
  }
  
}

export default counterReducer