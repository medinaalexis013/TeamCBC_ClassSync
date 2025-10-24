import { useState, useEffect } from 'react'
import Login from './login/Login.jsx'
import SignUp from './sign-up/Sign-Up.jsx'
import SignOut from './sign-out/sign-out.jsx'
import CreateReminder  from './create-reminder/Create-Reminder.jsx'
import Settings from './settings/settings.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './protected-route.jsx'
import Profile from './Profile/profile.jsx'
import Home from './home/Home.jsx'
import Notifications from './Notifications/notifications.jsx'
import NavBar from './components/NavBar/navbar.jsx'

import './app.css'

function App() {
  const [session, setSession] = useState(undefined) // undefined = loading, null = logged out

  return (
    <BrowserRouter id='main-case'>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route 
        path="/home"
        element={
          <ProtectedRoute session={session}>
            <Home/>
          </ProtectedRoute>
        }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
