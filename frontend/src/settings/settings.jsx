import { useState, useEffect } from 'react'
import React from 'react'
import './settings.css'

export default function Settings(props) {
    return (
        <div id='settings-page-case'>
            <img src='/src/assets/arrow_left.png' className='back-arrow'></img>
            <div className='title'>Settings</div>
            <div className='label'><img src='/src/assets/user-white.png' style={{marginRight: "10px"}}></img>My Account</div>
            <div className='container'>
                <div className='small-container'>Change Password<img src='/src/assets/arrow-right.png'></img></div>
                <div className='line'></div>
                <div className='small-container'>Edit Profile<img src='/src/assets/arrow-right.png'></img></div>
                <div className='line'></div>
                <div className='small-container'>Privacy & Security<img src='/src/assets/arrow-right.png'></img></div>
            </div>


            <div className='label'><img src='/src/assets/accessibility.png' style={{marginRight: "10px"}}></img>Accessibility</div>
            <div className='container'>
                <div className='small-container'>Text & Display<img src='/src/assets/arrow-right.png'></img></div>
                <div className='line'></div>
                <div className='small-container'>Screen Reader<img src='/src/assets/toggle-left.png'></img></div>
                <div className='line'></div>
                <div className='small-container'>Speech to Text<img src='/src/assets/toggle-left.png'></img></div>
            </div>


            <div className='label'><img src='/src/assets/commute.png' style={{marginRight: "10px"}}></img>Commute</div>
            <div className='container'>
                <div className='small-container'>Set Preferred Class Times<img src='/src/assets/arrow-right.png'></img></div>
                <div className='line'></div>
                <div className='small-container'>Set Departure/Arrival Times<img src='/src/assets/arrow-right.png'></img></div>
            </div>
        </div>
)}