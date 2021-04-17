import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
    console.log('ACTION:', action)
    switch (action.type) {

        case 'INIT_BLOGS':
            return action.data

        case 'CLEAR_BLOGS':
            return []

        case 'NEW_BLOG':
            return [...state, action.data]

        case 'ADD_LIKE':
            const id = action.data.id
            const blogToLike = state.find(b => b.id == id)
            const likedBlog = {
              ...blogToLike,
              likes: blogToLike.likes + 1
            }
            var newState = state.map(blog => 
              blog.id != id ? blog : likedBlog
            )
            return newState
            
        case 'DELETE_BLOG':
            newState = state.filter(b => b.id !== action.id)
            return newState
        
        default:
            return state

    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const clearBlogsFromRedux = () => { // Action creator used to clear blogs from redux state after user logs out
    return dispatch => {
        dispatch({
            type: 'CLEAR_BLOGS'
        })
    }
}

export const createBlog = blogObject => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}

export const addLike = (blog) => {
    return async dispatch => {
        const blogWithAddedLikes = { ...blog, likes: blog.likes + 1 }
        const likedBlog = await blogService.update(blog.id, blogWithAddedLikes)
        dispatch({
            type: 'ADD_LIKE',
            data: likedBlog,
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            id
        })
    }
}