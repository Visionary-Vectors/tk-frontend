import { useState } from 'react'
import Signup from './AuthPage'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Signup/>
    </>
  )
}

export default App
