import { useState } from 'react'
import { ApplicationViews } from './views/ApplicationViews'
import './index.css'


function App() {
  // const [token, setTokenState] = useState(localStorage.getItem(JSON.parse('current_user')))
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  

  // const setToken = (newToken) => {
  //   localStorage.setItem(JSON.parse('current_user'), newToken)
  //   setTokenState(newToken)
  // }

  const setUser = (newUser) => {
    const parsedUser = JSON.parse(newUser);
    localStorage.setItem('current_user', JSON.stringify(parsedUser));
    setCurrentUser(parsedUser);
  }
  

  return (
    <>
      {/* <NavBar token={token} setToken={setToken} /> */}
      <ApplicationViews currentUser={currentUser} setUser={setUser} />
    </>
  )
}

export default App
