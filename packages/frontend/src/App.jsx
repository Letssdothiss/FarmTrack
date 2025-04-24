import { useState } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')

  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hello')
      setMessage(response.data.message)
      setCount((count) => count + 1)
    } catch (error) {
      console.error('Error fetching message:', error)
      setMessage('Error connecting to server')
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>FarmTrack</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        {message && <p>Server says: {message}</p>}
      </div>
    </>
  )
}

export default App
