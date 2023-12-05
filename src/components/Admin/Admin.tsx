import React from 'react';
import './Admin.css';

const Admin = () => {
    return (
        <div className='admin-div'>
            <h1 className='admin-title'>Edit Pages</h1>
            <label className='label' htmlFor='Title'>Title:</label>
            <input className='admin-input' id='Title'/>
            <label className='label' htmlFor='Content'>Content:</label>
            <textarea  className='admin-textarea' id='Content'/>
            <button className='save-btn'>Save</button>
        </div>
    );
};

export default Admin;