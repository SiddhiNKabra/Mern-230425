import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState({ members: [] })

  useEffect(() => { 
    fetch("/members")
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(data)
      })
  }, [])

  return (
    <div>
      {data.members === undefined ? (
        <p>Loading....</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  )
}

export default App
