import React, { useEffect, useState } from 'react'
import userService from '../services/users'

const UserBasicInfo = () => {  
    const [userBasicInfo, setuserBasicInfo] = useState([])
    useEffect(() => {
        userService
        .getAll()
        .then(response => 
            setuserBasicInfo(response)
        )
    }, [])

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
                                <td> {user.name} </td>
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