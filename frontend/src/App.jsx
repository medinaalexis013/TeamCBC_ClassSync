import { useState } from 'react'
import Login from './login/login.jsx'
import SignUp from './sign-up/Sign-Up.jsx'
import SignOut from './sign-out/sign-out.jsx'
import CreateReminder  from './create-reminder/Create-Reminder.jsx'
import Settings from './settings/settings.jsx'

import './app.css'

function App() {

  return (
    <div id='main-case'>
      <Settings/>
    </div>
  )
}

export default App
