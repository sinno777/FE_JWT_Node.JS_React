import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import Users from '../components/ManageUsers/Users'
import PrivateRoutes from './PrivateRoutes'
import Roles from '../components/Role/Roles'
import GroupRole from '../components/GroupRole/GroupRole'
import Home from '../components/Home/Home'
import About from '../components/About/About'

export default function AppRoutes() {
    return (
        <>
            <Switch>
                <PrivateRoutes path='/users' component={Users} />
                <PrivateRoutes path='/roles' component={Roles} />
                <PrivateRoutes path='/group-role' component={GroupRole} />
                {/* right site */}
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="*">
                    <About />
                </Route>
            </Switch>
        </>
    )
}
