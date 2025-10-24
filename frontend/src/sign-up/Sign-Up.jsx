import { useState, useEffect } from 'react'
import React from 'react'
import './Sign-Up.css'
import { supabase } from '../lib/supabaseClient'

const email_regex = /^[a-zA-Z0-9]+([._-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+([.-][0-9a-zA-Z]+)*\.[a-zA-Z]{2,}$/

function validate_email(value) {
    return email_regex.test(value)
}

export default function SignUp(props) {
    const [emailInputValue, setEmailInputValue] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [confirm, setConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [infoMsg, setInfoMsg] = useState('')

    const handleChange = (event) => {
        if (event.target.className == "email") {
            setEmailInputValue(event.target.value)
        }
        else if (event.target.className == "first-name") {
            setFirstName(event.target.value)
        }
        else if (event.target.className == "last-name") {
            setLastName(event.target.value)
        }
        else if (event.target.className == "confirm") {
            setConfirm(event.target.value)
        }
        else {
            setPassword(event.target.value)
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

    function handleShowConfirm() {
        if (showConfirm) {
            setShowConfirm(false)
        }
        else {
            setShowConfirm(true)
        }
    } 

    async function handleSubmit(e) {
        e.preventDefault()
        const email = emailInputValue.trim();
        if (!validate_email(email)) {
            setErrorMsg('Invalid email address. Check for missing @ or domain.')
            return
        }
        if (!firstName) {
            setErrorMsg('Please enter your name.')
            return
        }
        if (!lastName) {
            setErrorMsg('Please enter your name.')
            return
        }
        if (!password) {
            setErrorMsg('Please enter your password.')
            return
        }
        if (password.length < 8) {
            setErrorMsg('Password must be at least 8 characters.')
            return
        }
        if (password != confirm) {
            setErrorMsg('Passwords do not match.')
            return
        }
    
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
        emailRedirectTo: window.location.origin
        }})
        setLoading(false)
        
        if (error) {
            return setErrorMsg(error.message || 'Sign up failed. Please try again.')
        }

        if (!data.session) {
        setInfoMsg('Success! Check your email to confirm your account.')
        return
        }
        }

    return (
		<div id='signup-page-case'>
			<img src='/src/assets/signup.png'></img>
            <form className='form' onSubmit={handleSubmit}>
                {errorMsg ? <div className='error-message'>{errorMsg}</div> : null}
                {infoMsg ? <div className='info-message'>{infoMsg}</div> : null}
                <div className='signup-box'>
                    <span className='label'>Name</span>
                    <div className='name-container'>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <input type='text' value={firstName} onChange={handleChange} className='first-name'></input>
                            <div  className='small-line'></div>
                            <span className='text-below-input'>First</span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <input type='text' value={lastName} onChange={handleChange} className='last-name'></input>
                            <div className='small-line'></div>
                            <span className='text-below-input'>Last</span>
                        </div>
                    </div>


                    <span className='label'>School Email</span>
                    <div id='name-case'>
                        <img src='/src/assets/user.png' style={{marginRight: "10px"}}></img>
                        <input type='text' value={emailInputValue} onChange={handleChange} className='email' placeholder="Enter your email"></input>
                        <div className='line' style={{margin: "2px"}}></div>
                    </div>


                    <span style={{marginTop: "15px"}} className='label'>Password</span>
                    <div id='password-case'>
                        <div>
                            <img className='lock' src='/src/assets/Lock.png'></img>
                            <input type={showPassword ? "text" : "password"} value={password} onChange={handleChange} className='name' style={{marginLeft: "10px"}} placeholder="Create Password"></input>
                        </div>
                        <img className='show-password-button' onClick={handleShowPassword} src='/src/assets/ShowPass.png'></img>
                    </div>
                    <div className='line'></div>

                    <div style={{display: "flex", justifyContent: "flex-start", paddingTop: "20px"}}>
                        <span className='password-tip'>Must be at least 8 characters.</span>
                    </div>

                    <span style={{marginTop: "15px"}} className='label'>Confirm Password</span>
                    <div id='password-case'>
                        <div>
                            <img className='lock' src='/src/assets/Lock.png'></img>
                            <input type={showConfirm ? "text" : "password"} value={confirm} onChange={handleChange} className='confirm' style={{marginLeft: "10px"}} placeholder="Create Password"></input>
                        </div>
                        <img className='show-confirm-button' onClick={handleShowConfirm} src='/src/assets/ShowPass.png'></img>
                    </div>
                    <div className='line'></div>

                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "40px"}}>
                    <button className='signup-button' onClick={handleSubmit}>Sign Up</button>
                </div>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "100px"}}>
                    <span className='label'>Already have an account? </span>
                    <a style={{marginLeft: "20px"}} href=''>Sign In</a>
                </div>
            </form>
		</div>
)}