import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"

export const Authorized = ({ currentUser }) => {
  if (currentUser) {
    return <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
