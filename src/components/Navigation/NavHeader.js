import React, { useContext, useEffect, useState } from 'react';
import './NavHeader.scss'
import { Link, NavLink, useLocation } from 'react-router-dom';
import UserContext from "../Context/Context";
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function NavHeader() {
    const listPath = [{
        id: 1,
        item: 'Home',
        itemLink: '/'
    }, {
        id: 2,
        item: 'User',
        itemLink: '/users'
    }, {
        id: 3,
        item: 'Project',
        itemLink: '/projects'
    }, {
        id: 4,
        item: 'About',
        itemLink: '/about'
    }]

    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation()
    if ((user && user.isAuthenticated) || location.pathname === '/') {
        return (
            <>
                {/* <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div> */}
                {/* responsive-navbar-nav  */}
                {/* className="bg-body-tertiary" */}
                {/* basic-navbar-nav */}
                <div className="navbar-container">
                    <Navbar expand="md" >
                        <Container>
                            <Link className='brandName' to='/' >Sinoo</Link>
                            {/* <Navbar.Brand href="#/" className='brandName'>Sinoo</Navbar.Brand> */}

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="bg-body-tertiary">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className="nav-link">Home</NavLink>
                                    <NavLink to="/users" className="nav-link">Users</NavLink>
                                    <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                    <NavLink to="/projects" className="nav-link">Project</NavLink>
                                    <NavLink to="/about" className="nav-link">About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated ?
                                        <>
                                            <Nav.Item className='nav-link'> <span className='logout-username'>Hi {user.account.username} !</span></Nav.Item>
                                            <NavDropdown title="Settings" id="collapsible-nav-dropdown">
                                                <NavDropdown.Item >Change your password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={() => logoutContext()}>Logout</NavDropdown.Item>
                                            </NavDropdown>
                                        </> :
                                        <Link className='nav-link' to='/login'><span>Login</span></Link>

                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>
    }
}

export default NavHeader;