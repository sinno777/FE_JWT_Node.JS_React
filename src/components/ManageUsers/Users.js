import React, { useEffect } from 'react'
import './Users.scss'
import { useHistory } from 'react-router-dom'

export default function Users() {
    let history = useHistory();

    useEffect(() => {
        const session = sessionStorage.getItem("account");
        if (!session) {
            history.push('/login')
        }
    }, []);
    return (
        <div>Users</div>
    )
}
