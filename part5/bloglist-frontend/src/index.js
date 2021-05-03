import React from 'react'
import ReactDOM from 'react-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import { Provider } from 'react-redux'
import { blogReducer } from './reducers/blogReducer'
import { errorReducer } from './reducers/errorReducer'
import { notificationReducer } from './reducers/notificationReducer'
import { userReducer } from './reducers/userReducer'
import { userBasicInfoReducer } from './reducers/userBasicInfoReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    errorState: errorReducer,
    notification: notificationReducer,
    user: userReducer,
    userBasicInfo: userBasicInfoReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools( // composeWihDevTools is used to add redux into chrome browser development tools
        applyMiddleware(thunk) // thunk used to allow us to create asynchronous actions
    ) 
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root')
)


