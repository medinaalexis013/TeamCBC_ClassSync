import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    return (
        <nav className='nav-bar'>
            <NavLink to='/roadmap' className='item'>
                <img src='./src/assets/Map pin.png' className='icon' />
            </NavLink>

            <NavLink to='/searchcourse' className='item'>
                <img src='./src/assets/Search Courses.png' className='icon' />
            </NavLink>

            <NavLink to='/home' className='item'>
                <img src='./src/assets/HomeIcon.png' className='icon' />
            </NavLink>
            
            <NavLink to='/builder' className='item'>
                <img src='./src/assets/Tool.png' className='icon' />
            </NavLink>

            <NavLink to='/profile' className='item'>
                <img src='./src/assets/ProfileIcon.png' className='icon' />
            </NavLink>
        </nav>
    );
};

export default NavBar;