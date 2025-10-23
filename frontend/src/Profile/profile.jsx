import {useState, useEffect} from 'react';
import React from 'react';
import './profile.css';
import NavBar from '../components/NavBar/navbar'

export default function Profile(props) {
    return (
        <div id='profile-case'>
            <img src='/src/assets/settings.png' className='settings-button'></img>
            <img src='/src/assets/Profile.png' alt='Profile' className='profile-header-image'/>
            
            <div className='avatar-container'>
                <img src='/src/assets/Avatar.png' alt='Avatar' className='avatar-image'/>
                <img src='/src/assets/edit.png' alt='Edit image' className='edit-avatar'/>
            </div>
            
            <div className='form-container'>
                <div className='name-email-container'>
                    <div className='name'>Ana Smith</div>
                    <div className='email'>Anasmith@gmail.com</div>
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
                        <button className='sign-out-button'>Sign Out</button>
                    </div>
                </div>

                <div className='info-container'>
                    <div className='info-heading'>
                        <div className='main-heading'>Personal / Contact Information</div>
                        <img src='/src/assets/edit.png' className='edit-button'/>
                    </div>
                    <div className='line'></div>
                    <div className='info'>
                        <div className='label'>Home Address:</div>
                        <div className='input'>12345 Main Street<br />Temecula, CA 92028</div>
                    </div>
                    <div className='line'></div>

                    <div className='info'>
                        <div className='label'>Mailing Address:</div>
                        <div className='input'>1235 Main Street<br />Temecula, CA 92028</div>
                    </div>
                    <div className='line'></div>

                    <div className='info'>
                        <div className='label'>Phone Number:</div>
                        <div className='input'>(123) 456-7890</div>
                    </div>
                    <div className='line'></div>

                    <div className='info'>
                        <div className='label'>Emergency Contacts:</div>
                        <div className='input'>No current emergency<br />contact information found</div>
                    </div>
                    <div className='line'></div>
                </div>
            </div>
            <NavBar />
        </div>
    )
}