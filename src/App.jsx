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

  // const setUser = (newUser) => {
  //   const parsedUser = JSON.parse(newUser);
  //   localStorage.setItem('current_user', JSON.stringify(parsedUser));
  //   setCurrentUser(parsedUser);
  // }

  // const setUser = (userData) => {
  //   let parsedUser;
    
  //   // Check if userData is a string or an object
  //   if (typeof userData === 'string') {
  //     // Parse it if it's a string
  //     parsedUser = JSON.parse(userData);
  //   } else {
  //     // Use it directly if it's already an object
  //     parsedUser = userData;
  //   }
  
  //   localStorage.setItem('current_user', JSON.stringify(parsedUser));
  //   setCurrentUser(parsedUser);
  // }
  

  return (
    <>
      {/* <NavBar token={token} setToken={setToken} /> */}
      <ApplicationViews currentUser={currentUser} setUser={setUser} />
    </>
  )
}

export default App
