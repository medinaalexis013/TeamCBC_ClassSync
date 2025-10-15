import { useState, useEffect } from 'react';
import React from 'react';
import './Create-Reminder.css';

export default function CreateReminder(props) {

    return (
        <div id='create-reminder-case'>
            <img src='/src/assets/arrow_left.png' className='back-arrow'></img>

            <img src='/src/assets/New Reminder.png' alt='New Reminder' className='main-header-image'/>

            <div className='form-container'>
                <form className='form'>
                    <div className='outlined-title-box'>
                        <label htmlFor='Title' className='outlined-label'>Title</label>
                        <input type='text' id='Title' className='input-field' placeholder='Enter title' />
                    </div>
                    <div className='outlined-details-box'>
                        <label htmlFor='Details' className='outlined-label'>Details</label>
                        <textarea id='Details' className='input-field textarea-field' rows='4' placeholder='Add Description...' />
                    </div>
                    <div className='date-time-container'>
                        <div className='outlined-date-box'>
                            <label htmlFor='Date' className='outlined-label'>Date</label>
                                <input type='date' id='Date' className='input-field'/>
                                {/*<img src='/src/assets/calendar.png' style={{marginLeft: "10px"}}></img>*/}
                                <div className='icon-ellipse'></div>
                        </div>

                        <div className='outlined-time-box'>
                            <label htmlFor='Time' className='outlined-label'>Time</label>
                                <input type='time' id='Time' className='input-field'/>
                                {/*<img src='/src/assets/time.png' style={{marginLeft: "10px"}}></img>*/}
                                <div className='icon-ellipse'></div>
                        </div>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", paddingTop: "40px"}}>
                        <button className='create-button'>Create</button>
                    </div>
                </form>
            </div> 
        </div>
)}