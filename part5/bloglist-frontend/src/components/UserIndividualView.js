import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserIndividualView = () => {
    const id = useParams().id
    const userBasicInfo = useSelector(state => state.userBasicInfo)

    if (!userBasicInfo) { // Use conditional rendering here to prevent page from rendering before userBasicInfo is loaded into redux state
        return null
    }

    const user = userBasicInfo.find(u => u.id === id) 

    return (
        <div> 
            <h2> {user.name} </h2>
            <h3> added blogs </h3>
            <ul>
                {
                    user.blogs.map(blog => {
                        return (
                            <li> {blog.title} </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default UserIndividualView