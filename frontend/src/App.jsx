<<<<<<< HEAD
import { useState, useEffect } from 'react'
=======
import { useState } from 'react'
>>>>>>> c8a68fbdcb95f4579aa331414e5530b3118aba4e
import Login from './login/Login.jsx'
import SignUp from './sign-up/Sign-Up.jsx'
import SignOut from './sign-out/sign-out.jsx'
import CreateReminder  from './create-reminder/Create-Reminder.jsx'
import Settings from './settings/settings.jsx'
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './protected-route.jsx'
=======
import Profile from './Profile/profile.jsx'
import Home from './home/Home.jsx'
import Notifications from './Notifications/notifications.jsx'
import NavBar from './components/NavBar/navbar.jsx'
>>>>>>> c8a68fbdcb95f4579aa331414e5530b3118aba4e

import './app.css'

function App() {
  const [session, setSession] = useState(undefined) // undefined = loading, null = logged out

  // useEffect(() => {
  //   let ignore = false
  //   ;(async () => {
  //     const { data: { session } } = await supabase.auth.getSession()
  //     if (!ignore) setSession(session ?? null)
  //   })()
  //   const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => setSession(s ?? null))
  //   return () => { ignore = true; sub.subscription.unsubscribe() }
  // }, [])

  return (
    <BrowserRouter id='main-case'>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        {/* <Route 
        path="/home"
        element={
          <ProtectedRoute session={session}>
            <Home/>
          </ProtectedRoute>
        }
        ></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
