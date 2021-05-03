import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const UserBasicInfo = () => {  
    const userBasicInfo = useSelector(state => state.userBasicInfo)

    if (!userBasicInfo) { // Use conditional rendering here to prevent page from rendering before userBasicInfo is loaded into redux state
        return null
    }

    return (
        <div>
            <h1> Users </h1>
            <table>
                <tbody>
                <tr>
                    <td>  </td>
                    <td> Blogs created </td>
                </tr>
                {
                    userBasicInfo.map(user => {
                        return(
                            <tr key={user.id}>
                                <td>  <Link to={`/users/${user.id}`}> {user.name} </Link> </td>
                                <td> {user.blogs.length} </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default UserBasicInfo