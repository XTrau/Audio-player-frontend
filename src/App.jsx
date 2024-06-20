import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  )
}

export default App
