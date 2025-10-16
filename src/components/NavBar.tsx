import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

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
        <img src="" alt="" />
        {/* IF DESKTOP: Show logo + full name */}
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
            <div>
              <p>Home</p>
            </div>
            <div>
              <p>All castles</p>
            </div>
            <div>
              <p>My bookings</p>
            </div>
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