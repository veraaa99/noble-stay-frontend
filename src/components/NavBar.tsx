import { useState } from "react"

const NavBar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const menuModalHandler = () => {
    setIsModalOpen(isModalOpen => !isModalOpen)
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

      {
        isModalOpen && 
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
              <p>Login /Sign up</p>
            </div>
          </div>
        </div>
      }
      
    </div>
  )
}
export default NavBar