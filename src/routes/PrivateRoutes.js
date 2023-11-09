import React, { useContext, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Context from '../components/Context/Context'

export default function PrivateRoutes(props) {
    const { path, component } = props
    const { user } = useContext(Context);
    if (user && user.isAuthenticated) {
        return (
            <Route path={path} component={component} />
        )
    }
    else {

        return <Redirect to='/login' />
    }
}
