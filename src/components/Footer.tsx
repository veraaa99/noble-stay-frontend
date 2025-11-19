import nobleStayLogo from '../assets/Logo.svg'

import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className='flex flex-row justify-between items-center px-5 py-2 border-2 mt-5'>
      {/* Logo and full name */}
      <div>
        <img src={nobleStayLogo} alt="" />
      </div>
      {/* Contact */}
      <div className='flex flex-col'>
        <h3>Contact us</h3>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-row gap-1 items-center'>
            <MdOutlinePhoneInTalk />
            <p className='caption'>000 000 00 00</p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <MdMailOutline />
            <p className='caption'>noblestay@email.com</p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <MdOutlineLocationOn />
            <p className='caption'>Stockholm, Sweden</p>
          </div>
        </div>
      </div>
      {/* IF DESKTOP: Follow us? */}
    </footer>
  )
}
export default Footer