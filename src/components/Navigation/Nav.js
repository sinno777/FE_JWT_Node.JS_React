import React, { useEffect, useState } from 'react';
import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';
function Nav(props) {
    const [isShow, setIsShow] = useState(true);

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, []);
    return (
        <>
            {isShow &&
                <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>
    );
}

export default Nav;