import { useState, useEffect } from 'react'
import React from 'react'
import './Login.css'
import { supabase } from '../lib/supabaseClient'

const email_regex = /^[a-zA-Z0-9]+([._-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+([.-][0-9a-zA-Z]+)*\.[a-zA-Z]{2,}$/

function validate_email(value) {
    return email_regex.test(value)
}

export default function Login(props) {
    const [emailInputValue, setEmailInputValue] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')

    const handleChange = (event) => {
        if (event.target.className == "username") {
            setEmailInputValue(event.target.value)
        }
        else {
            setPassword(event.target.value)
        }
    }

    async function handleSubmit(e) {
    e.preventDefault()
    const email = emailInputValue.trim();
    if (!validate_email(email)) {
        setErrorMsg('Invalid email address. Check for missing @ or domain.')
        return
    }
    if (!password) {
        setErrorMsg('Please enter your password.')
        return
    }

    setLoading(true)
    setErrorMsg('')
    const { data, error } = await supabase.auth.signInWithPassword({email, password})
    setLoading(false)
    if (error) {
        setErrorMsg(error.message || 'Login failed. Please try again.')
        return
    }
    }

    function handleShowPassword() {
        if (showPassword) {
            setShowPassword(false)
        }
        else {
            setShowPassword(true)
        }
    } 

    return (
		<div id='login-page-case'>
			<img id='main-logo' src='/src/assets/MainLogo.png'></img>
            <form className='form' onSubmit={handleSubmit}>
            {errorMsg ? <div className='error-message'>{errorMsg}</div> : null}
                <div className='login-box'>
                    <label>Username</label>
                    <div id='username-case'>
                        <img src='/src/assets/user.png'></img>
                        <input value={emailInputValue} onChange={handleChange} type='text' className='username' placeholder="Enter Username"></input>
                    </div>
                    <div className='line'></div>
                    <label>Password</label>
                    <div id='password-case'>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <img className='lock' src='/src/assets/Lock.png'></img>
                            <input value={password} onChange={handleChange} type={showPassword ? "text" : "password"} className='password' placeholder="Enter Password"></input>
                        </div>
                        <img className='show-password-button' onClick={handleShowPassword} src='/src/assets/ShowPass.png'></img>
                    </div>
                    <div className='line'></div>
                    <div style={{display: "flex", justifyContent: "flex-end", padding: "10px"}}>
                        <a href='' className='forgot-password'>Forgot Password?</a>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "40px"}}>
                    <button onClick={handleSubmit} className='login-button'>Log In</button>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "100px"}}>
                    <span>Don't have an account? </span>
                    <a style={{marginLeft: "20px"}} href='/sign-up'>Sign Up</a>
                </div>
            </form>
		</div>
)}