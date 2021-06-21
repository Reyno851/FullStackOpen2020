import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'
import { initializeUsers } from '../reducers/userBasicInfoReducer'

const UserBasicInfo = () => {  
    const userBasicInfo = useSelector(state => state.userBasicInfo)
    const dispatch = useDispatch()

    useEffect(() => { // Add useeffect here to dispatch initializeUsers so as to get all users basic info
        dispatch(initializeUsers()) // This is for updating userbasicinfo page when a new blog is posted
      }, []) 

    if (!userBasicInfo) { // Use conditional rendering here to prevent page from rendering before userBasicInfo is loaded into redux state
        return null
    }

    return (
        <div>
            <h1> Users </h1>
            <Table striped>
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
            </Table>
        </div>
    )
}

export default UserBasicInfo