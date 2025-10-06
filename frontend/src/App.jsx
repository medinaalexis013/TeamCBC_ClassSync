import { useState } from 'react'
import Login from './login.jsx'
import SignUp from './Sign-Up.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='main-case'>
      <SignUp/>
    </div>
  )
}

export default App
