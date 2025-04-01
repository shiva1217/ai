import { useState } from 'react'
import './App.css'
import Course from './component/course'
import Setting from './component/settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Course /> 
     <Setting />
    </>
  )
}

export default App
