import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export default function PrivateRoutes(props) {
    let history = useHistory();
    const { path, component } = props

    useEffect(() => {
        const session = sessionStorage.getItem("account");
        if (!session) {
            history.push('/login')
            window.location.reload()
        }
        if (session) {
            //check role
        }
    }, []);

    return (
        <Route path={path} component={component} />
    )
}
