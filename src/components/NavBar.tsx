import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { Link, useNavigate } from "react-router"
import { useUser } from "@/contexts/UserContext"

const NavBar = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const { currentUser, actions } = useUser()
  const navigate = useNavigate()

  const menuModalHandler = () => {
    setIsMenuModalOpen(isMenuModalOpen => !isMenuModalOpen)
  }

  const loginModalHandler = () => {
    setIsLoginModalOpen(isLoginModalOpen => !isLoginModalOpen)
    setIsRegisterModalOpen(false)
    setIsMenuModalOpen(false)
  }

  const registerModalHandler = () => {
    setIsRegisterModalOpen(isRegisterModalOpen => !isRegisterModalOpen)
    setIsLoginModalOpen(false)
    setIsMenuModalOpen(false)
  }

  const logoutHandler = () => {
    actions.logoutUser()
    setIsMenuModalOpen(false)
    navigate('/')
  }

  // TODO: Handle my bookings onclick if user isn't logged in

  return (
    <div>
      <div>
        {/* Logotype */}
        <Link to={'/'}>
          <img src="" alt="" />
          {/* IF DESKTOP: Show logo + full name */}
        </Link>
        {/* NOBLE STAY */}
      </div>
      <div>
        {/* Hamburger menu */}
        <p onClick={menuModalHandler}>Hamburger menu</p>
        <img src="" alt="" onClick={menuModalHandler}/>
        {/* IF DESKTOP:  Show all options*/}
        {/* All castles, My Bookings, Login/Sign up */}
      </div>

      { isMenuModalOpen && 
        <div>
          <div>
            <h1>Menu</h1>
            <p onClick={menuModalHandler}>X</p>
          </div>
          <div>
            <Link to={'/'} onClick={menuModalHandler}>
              <div>
                <p>Home</p>
              </div>
            </Link>
            <Link to={'/castles' } onClick={menuModalHandler}>
              <div>
                <p>All castles</p>
              </div>
            </Link>
            <Link to={'/profile'}>
              <div>
                <p>My bookings</p>
              </div>
            </Link>
            <div>
              { currentUser == null 
              ?
                <p onClick={loginModalHandler}>Login / Sign up</p>
              :
                <p onClick={logoutHandler}>Logout</p>
              }
            </div>
          </div>
        </div>
      }
      {
        isLoginModalOpen && 
        <div>
          <p onClick={loginModalHandler}>X</p>
          <LoginForm setIsLoginModalOpen={setIsLoginModalOpen}/>
          <p>Don't have an account?</p> <p onClick={registerModalHandler}>SIGN UP</p>
        </div>
      }
      {
        isRegisterModalOpen && 
        <div>
          <p onClick={registerModalHandler}>X</p>
          <RegisterForm setIsRegisterModalOpen={setIsRegisterModalOpen}/>
          <p>Already have an account?</p> <p onClick={loginModalHandler}>LOG IN</p>
        </div>
      }
      
    </div>
  )
}
export default NavBar