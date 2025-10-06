import { useState, useEffect } from 'react'
import React from 'react'
import './Login.css'

export default function Login(props) {

    return (
		<div className='login-page-case'>
			<img id='main-logo' src='/src/assets/MainLogo.png'></img>
            <form className='form'>

                <div className='login-box'>
                    <label>Username</label>
                    <div id='username-case'>
                        <img src='/src/assets/user.png'></img>
                        <input type='text' className='username' placeholder="Enter Username"></input>
                        <div className='line'></div>
                    </div>
                    <label>Password</label>
                    <div id='password-case'>
                        <div>
                            <img className='lock' src='/src/assets/Lock.png'></img>
                            <input type='text' className='username' placeholder="Enter Password"></input>
                        </div>
                        <img className='show-password-button' src='/src/assets/ShowPass.png'></img>
                        <div className='line'></div>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", padding: "10px"}}>
                        <a href='' className='forgot-password'>Forgot Password?</a>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "40px"}}>
                    <button className='login-button'>Log In</button>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "100px"}}>
                    <span>Don't have an account? </span>
                    <a style={{marginLeft: "20px"}} href=''>Sign Up</a>
                </div>
            </form>
		</div>
)}