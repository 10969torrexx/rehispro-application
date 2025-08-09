import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gray-900 text-white p-6 text-2xl border-2 border-green-500">
        Tailwind v3 is working! 🚀
      </div>
    </>
  )
}

export default App
