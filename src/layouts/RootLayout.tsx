import { Outlet } from "react-router"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

const RootLayout = () => {
  return (
    <div className="h-full">
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default RootLayout