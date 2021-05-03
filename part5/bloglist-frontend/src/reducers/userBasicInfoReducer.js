import userService from '../services/users'

export const userBasicInfoReducer = (state = null, action) => {
    switch (action.type) {
      case 'INIT_USERS':
        return action.data
      default:
        return state
    }
}


export const initializeUsers = () => {
  return async dispatch => {
      const allUserInfo = await userService.getAll()
      dispatch({
          type: 'INIT_USERS',
          data: allUserInfo,
      })
  }
}