import { Outlet, useLoaderData } from 'react-router-dom'
import { useState } from 'react';
import './App.css'

function App() {
  const [user, setUser] = useState(useLoaderData());

  return (
    <>
    <Outlet context={{user, setUser}}/>
    </>
  )
}

export default App;
