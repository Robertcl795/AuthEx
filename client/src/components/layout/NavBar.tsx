import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <header
        id='main'
        className="navbar"
        role="navigation"
        aria-label="main navigation">
            <NavLink to='/'>AuthX API</NavLink>
            <nav className='navbar__collapse' id='collapse'>
                <NavLink to='/signup' activeClassName='active' className='navbar__link'>Sign Up</NavLink>
                <NavLink to='/signin' activeClassName='active' className='navbar__link'>Login</NavLink>
                <NavLink to='/signout' activeClassName='active' className='navbar__link'>Logout</NavLink>
            </nav>
        </header>
    )
}

export default NavBar
