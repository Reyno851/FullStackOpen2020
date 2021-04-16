import blogService from '../services/blogs'

export const blogReducer = (state = [], action) => {
    console.log('ACTION:', action)
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
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

export const createBlog = blogObject => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog,
        })
    }
}