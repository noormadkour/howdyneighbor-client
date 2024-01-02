import { useState } from 'react'
import { ApplicationViews } from './views/ApplicationViews'
import './index.css'


function App() {
  // const [token, setTokenState] = useState(localStorage.getItem(JSON.parse('current_user')))
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (newUser) => {
    // newUser is now expected to be an object, not a string
    localStorage.setItem('current_user', JSON.stringify(newUser));
    setCurrentUser(newUser);
  }
  
  return (
    <>
      {/* <NavBar token={token} setToken={setToken} /> */}
      <ApplicationViews currentUser={currentUser} setUser={setUser} />
    </>
  )
}

export default App
