import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

import Navbar from './components/navbar';
import RecipeList from "./components/RecipeList";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="logos">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <RecipeList token='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVXUW1lbDlEWWFwN0FEWTVhUEhueSJ9.eyJpc3MiOiJodHRwczovL2Rldi0xMXZyNndjMy5hdXRoMC5jb20vIiwic3ViIjoiV1JjUVFvN1JOZDVQMGRSdHhYaHFkd3VKWlJ3YnNkcVZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcmVjaXBlYXBpLmRyaWxsY2hhbi5uZXQiLCJpYXQiOjE2ODI4MTE3NjEsImV4cCI6MTY4NTQwMzc2MSwiYXpwIjoiV1JjUVFvN1JOZDVQMGRSdHhYaHFkd3VKWlJ3YnNkcVYiLCJzY29wZSI6InJlYWQ6bWVzc2FnZXMgcmVhZDpyZWNpcGVzIHdyaXRlOmRhdGEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.YzXrax4l5NSvGdi6Cy-y9nxDn4auOIa9QM4c_nc4c8qGzVKfmcr2yT07rATdlyec193c_JNNmwG2_bu9gBsmVcT6aqpkL4xhWoRnldaM35tprh7GdWMqi3uemSjj-3H-Ba7WlZT8PLGrT84fXRScdSWgfHvoN_OAOjtctH7Psk0kRkVeUJenHFXY66M37p0s9UZUUQkXSqJ-xju1E74qZi3NxLCGllqjbW0rWgclWWq_NQcFBG3rw1TbBzB9LUOAjTqalX35l73a6gMMEpKylz9vtCyjOoLNFR9hWAkHqG1xrLsbvPjrAWCvQjutozqmy4TZVHk-0lTtVyLhvOcAZQ' />
      </div>
    </>
  )
}

export default App
