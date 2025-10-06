import { useState, useEffect } from 'react'
import React from 'react'
import './Sign-Up.css'

export default function SignUp(props) {

    return (
		<div className='signup-page-case'>
			<img src='/src/assets/signup.png'></img>
            <form className='form'>

                <div className='signup-box'>
                    <span className='label'>Name</span>
                    <div className='name-container'>
                        <div style={{display: "flex", flexDirection: "column-reverse"}}>
                            <input type='text' id='first-name' placeholder="First"></input>
                            <div  className='small-line'></div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column-reverse"}}>
                            <input type='text' className='last-name' placeholder="Last"></input>
                            <div className='small-line'></div>
                        </div>
                    </div>
                    <span className='label'>School Email</span>
                    <div id='name-case'>
                        <img src='/src/assets/user.png' style={{marginRight: "10px"}}></img>
                        <input type='text' className='email' placeholder="Enter your email"></input>
                        <div className='line' style={{margin: "2px"}}></div>
                    </div>
                    <span style={{marginTop: "15px"}} className='label'>Password</span>
                    <div id='password-case'>
                        <div>
                            <img className='lock' src='/src/assets/Lock.png'></img>
                            <input type='text' className='name' style={{marginLeft: "10px"}} placeholder="Create Password"></input>
                        </div>
                        <img className='show-password-button' src='/src/assets/ShowPass.png'></img>
                        <div className='line'></div>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-start", paddingTop: "20px"}}>
                        <a href='' className='forgot-password'>Must be at least 8 characters.</a>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "40px"}}>
                    <button className='signup-button'>Sign Up</button>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "100px"}}>
                    <span className='label'>Already have an account? </span>
                    <a style={{marginLeft: "20px"}} href=''>Sign In</a>
                </div>
            </form>
		</div>
)}