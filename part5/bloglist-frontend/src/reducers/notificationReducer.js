export const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIF':
            const newNotificationState = action.data
            return newNotificationState
    
        case 'CLEAR_NOTIF':
            return ''  

        default: return state
    }
}

let timeoutId

export const setNotification = (content, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIF',
            data: content
        })
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIF' })
        }, timeout*1000)
    }
}
