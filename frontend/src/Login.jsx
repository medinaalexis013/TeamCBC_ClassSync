import { useState, useEffect } from 'react'
import React from 'react'
import './Login.css'

export default function Login(props) {
	//const [selectedGen, setSelectedGen] = useState(9);

    return (
		<div className='login-page-case'>
			<img id='main-logo' src='/src/assets/MainLogo.png'></img>
            <form className='login-box'>
                <label for='username'> Username</label>
                <div id='username-case'>
                    <img src='/src/assets/user.png'></img>
                    <input type='text' id='username'></input>
                </div>
                <span>Enter Username Here</span>
                <div> Password</div>
            </form>
		</div>
)}