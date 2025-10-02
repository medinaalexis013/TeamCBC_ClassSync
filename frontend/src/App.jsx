import { useState } from 'react'
import Login from './login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='main-case'>
      <Login/>
    </div>
  )
}

export default App
