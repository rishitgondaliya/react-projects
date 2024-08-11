import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

export default function Profile() {
    const { user } = useContext(UserContext)

    if (!user) {
        return (
            <h2>Please login!</h2>
        )
    } else {
        return (
            <h2>Welcome {user.username}</h2>
        )
    }
}