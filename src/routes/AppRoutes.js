import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import Users from '../components/ManageUsers/Users'
import PrivateRoutes from './PrivateRoutes'
import Roles from '../components/Role/Roles'
const Project = () => <span>Project</span>

export default function AppRoutes() {
    return (
        <>
            <Switch>
                <PrivateRoutes path='/users' component={Users} />
                <PrivateRoutes path='/projects' component={Project} />
                <PrivateRoutes path='/roles' component={Roles} />

                {/* right site */}
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 not find
                </Route>
            </Switch>
        </>
    )
}
