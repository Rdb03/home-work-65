import React from 'react';
import {NavLink} from "react-router-dom";
import './ToolBar.css';

const ToolBar = () => {
    return (
        <div className='tool-bar'>
            <div>
                <h1>Static Pages</h1>
            </div>
            <div className='nav-link-div'>
                <NavLink className='nav-link' to='/pages/home'>Home</NavLink>
                <NavLink className='nav-link'to='/pages/about'>About</NavLink>
                <NavLink className='nav-link' to='/pages/contacts'>Contacts</NavLink>
                <NavLink className='nav-link' to='/pages/division'>Divisions</NavLink>
                <NavLink className='nav-link' to='/pages/admin'>Admin</NavLink>
            </div>
        </div>
    );
};

export default ToolBar;