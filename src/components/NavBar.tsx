import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/contexts/UserContext";
import nobleStaySmallLogo from "../assets/A.svg";
import nobleStayBigLogo from "../assets/LOGO Navbar.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import Modal from "react-modal";

const NavBar = () => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { currentUser, token, actions } = useUser();
  const navigate = useNavigate();

  const menuModalHandler = () => {
    setIsMenuModalOpen((isMenuModalOpen) => !isMenuModalOpen);
  };

  const loginModalHandler = () => {
    setIsLoginModalOpen((isLoginModalOpen) => !isLoginModalOpen);
    setIsRegisterModalOpen(false);
    setIsMenuModalOpen(false);
  };

  const registerModalHandler = () => {
    setIsRegisterModalOpen((isRegisterModalOpen) => !isRegisterModalOpen);
    setIsLoginModalOpen(false);
    setIsMenuModalOpen(false);
  };

  const logoutHandler = () => {
    actions.logoutUser();
    setIsMenuModalOpen(false);
    navigate("/");
  };

  return (
    <nav className="flex align-middle justify-between px-5 py-3 shadow-md">
      <div className="flex align-middle justify-center items-center">
        {/* Logotype */}
        <Link to={"/"}>
          <img className="sm:hidden" src={nobleStaySmallLogo} alt="" />
          <img className="hidden sm:block w-50" src={nobleStayBigLogo} alt="" />
        </Link>
        {/* NOBLE STAY */}
      </div>
      <div className="flex align-middle justify-center items-center">
        {/* Hamburger menu */}
        <RxHamburgerMenu
          className="cursor-pointer sm:hidden"
          size={30}
          onClick={menuModalHandler}
        />
        {/* Desktop menu */}
        <div className="hidden sm:flex md:gap-4">
          <Link to={"/"}>
            <div className=" px-5  font-light py-2">
              <p>Home</p>
            </div>
          </Link>
          <Link to={"/castles"}>
            <div className=" px-5  font-light py-2">
              <p>All castles</p>
            </div>
          </Link>
          {currentUser !== null && (
            <Link to={"/profile"}>
              <div className=" px-5  font-light py-2">
                <p>My bookings</p>
              </div>
            </Link>
          )}
          <div className=" px-5  font-light py-2 cursor-pointer">
            {currentUser == null ? (
              <p onClick={loginModalHandler}>Login / Sign up</p>
            ) : (
              <p onClick={logoutHandler}>Logout</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isMenuModalOpen}
        onRequestClose={() => setIsMenuModalOpen(false)}
        className="h-full w-50 bg-(--color-background) pt-12 rounded-bl-xl shadow-lg max-w-md absolute right-0"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <div className="flex flex-row items-center justify-between p-5">
          <h1 className="text-(--color-foreground)">Menu</h1>
          <h2
            className="text-(--color-foreground) font-light"
            onClick={menuModalHandler}
          >
            ✕
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <Link to={"/"} onClick={menuModalHandler}>
            <div className="bg-(--primary) px-5 text-(--background) font-light py-2">
              <p>Home</p>
            </div>
          </Link>
          <Link to={"/castles"} onClick={menuModalHandler}>
            <div className="bg-(--primary) px-5 text-(--background) font-light py-2">
              <p>All castles</p>
            </div>
          </Link>
          {currentUser !== null && (
            <Link to={"/profile"} onClick={menuModalHandler}>
              <div className="bg-(--primary) px-5 text-(--background) font-light py-2">
                <p>My bookings</p>
              </div>
            </Link>
          )}
          <div className="bg-(--primary) px-5 text-(--background) font-light py-2">
            {currentUser == null ? (
              <p onClick={loginModalHandler}>Login / Sign up</p>
            ) : (
              <p onClick={logoutHandler}>Logout</p>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        className="w-70 bg-white pt-2 pb-5 px-5 rounded shadow-lg max-w-md mx-auto mt-5 realtive"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <div>
          <h2
            className="text-(--color-foreground) font-light text-right"
            onClick={loginModalHandler}
          >
            ✕
          </h2>
          <h2 className="text-center">Welcome back</h2>
          <LoginForm setIsLoginModalOpen={setIsLoginModalOpen} />
          <div className="flex items-center justify-center gap-2">
            <p className="caption">Don't have an account?</p>{" "}
            <p className="link underline" onClick={registerModalHandler}>
              SIGN UP
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={() => setIsRegisterModalOpen(false)}
        className="w-70 bg-white pt-2 pb-5 px-5 rounded shadow-lg max-w-md mx-auto mt-2 realtive sm:pb-3"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <div>
          <h2
            className="text-(--color-foreground) font-light text-right"
            onClick={registerModalHandler}
          >
            ✕
          </h2>
          <h2 className="text-center">Sign up to Noble Stay</h2>
          <RegisterForm setIsRegisterModalOpen={setIsRegisterModalOpen} />
          <div className="flex items-center justify-center gap-2">
            <p className="caption">Already have an account?</p>{" "}
            <p className="link underline" onClick={loginModalHandler}>
              LOG IN
            </p>
          </div>
        </div>
      </Modal>
    </nav>
  );
};
export default NavBar;
