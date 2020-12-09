import React, { useEffect, useState } from 'react'

const App: React.FC = () => {
  const [value, setValue] = useState('')
  const [user, setUser] = useState<string | unknown>('')

  const getUser = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve('user'), 150)
  })

  useEffect(() => {
    ;(async () => {
      const receivedUser = await getUser()
      setUser(receivedUser)
    })()
  }, [])

  return (
    <>
      {user && <h2>Logged in as {user}</h2>}
      <img src="" alt="alt text here" />
      <div>
        <input
          type="text"
          id="search"
          placeholder="placeholder text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <label htmlFor="search">Search</label>
      </div>
      <p>Search for {value ? value : '...'}</p>
    </>
  )
}

export default App
