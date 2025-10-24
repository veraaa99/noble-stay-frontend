import { useUser } from "@/contexts/UserContext"
import { Navigate, Outlet } from "react-router"

const UserLayout = () => {

  const { currentUser } = useUser()

  return (
    currentUser
    ? <Outlet />
    : <Navigate to="/" replace />
  )
}
export default UserLayout