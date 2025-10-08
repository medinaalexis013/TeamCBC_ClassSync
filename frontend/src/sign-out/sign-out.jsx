import { useState, useEffect } from 'react'
import React from 'react'
import './sign-out.css'

export default function SignOut(props) {
    return (
        <div id='sign-out-page-case'>
            <div className='title'>Sign Out?</div>
            <div className='main-container'>
                <div style={{marginBottom: "60px", marginTop: "20px"}} className='choice'>Yes</div>
                <div style={{marginBottom: "20px"}} className='choice'>No</div>
            </div>
        </div>
)}