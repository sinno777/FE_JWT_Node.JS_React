import React, { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Context from '../components/Context/Context'

export default function PrivateRoutes(props) {
    let history = useHistory();
    const { path, component } = props

    const { user } = useContext(Context);


    useEffect(() => {
        console.log('>>>Check context user: ', user)
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
