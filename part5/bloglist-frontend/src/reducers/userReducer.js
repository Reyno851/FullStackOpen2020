import userService from '../services/users'

export const userReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.data
      // case 'INIT_USERS':
      //   return action.data
      default:
        return state
    }
}


export const setUser = user => {
    return {
      type: 'SET_USER',
      data: user
    }
}

// export const initializeUsers = () => {
//   return async dispatch => {
//       const basicUserInfo = await userService.getAll()
//       dispatch({
//           type: 'INIT_USERS',
//           data: basicUserInfo,
//       })
//   }
// }