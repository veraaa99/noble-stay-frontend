import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { Link } from "react-router"

const NavBar = () => {

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const menuModalHandler = () => {
    setIsMenuModalOpen(isMenuModalOpen => !isMenuModalOpen)
  }

  const loginModalHandler = () => {
    setIsLoginModalOpen(isLoginModalOpen => !isLoginModalOpen)
    setIsRegisterModalOpen(false)
    // setIsMenuModalOpen(false)
  }

  const registerModalHandler = () => {
    setIsRegisterModalOpen(isRegisterModalOpen => !isRegisterModalOpen)
    setIsLoginModalOpen(false)
    // setIsMenuModalOpen(false)
  }

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
            <Link to={'/all' } onClick={menuModalHandler}>
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
              <p onClick={loginModalHandler}>Login /Sign up</p>
            </div>
          </div>
        </div>
      }
      {
        isLoginModalOpen && 
        <div>
          <p>X</p>
          <LoginForm />
          <p>Don't have an account?</p> <p onClick={registerModalHandler}>SIGN UP</p>
        </div>
      }
      {
        isRegisterModalOpen && 
        <div>
          <p>X</p>
          <RegisterForm />
          <p>Already have an account?</p> <p onClick={loginModalHandler}>LOG IN</p>
        </div>
      }
      
    </div>
  )
}
export default NavBar