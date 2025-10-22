import { useState } from 'react'
import Login from './login/Login.jsx'
import SignUp from './sign-up/Sign-Up.jsx'
import SignOut from './sign-out/sign-out.jsx'
import CreateReminder  from './create-reminder/Create-Reminder.jsx'
import Settings from './settings/settings.jsx'
import Profile from './Profile/profile.jsx'
import Home from './home/Home.jsx'
import Notifications from './Notifications/notifications.jsx'
import NavBar from './components/NavBar/navbar.jsx'

import './app.css'

function App() {

  return (
    <div id='main-case'>
      <Login/>
    </div>
  )
}

export default App
