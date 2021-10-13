import React, { useState } from 'react'
import { Link } from 'react-scroll';
import logo from '../../assets/images/logo1.png'

const NavBar = () => {
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBackground)
    return (
        <nav className={navbar ? "navbar active" : "navbar"}>
            <Link to="main" className='logo'>
                <img src={logo} alt='' />
            </Link>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="nav-icon"></span>
            </label>
            <ul className="menu">
                <li><Link to="#">Menu</Link></li>
                <li><Link to="#">About</Link></li>
                <li><Link to="#">Booking</Link></li>
                <li><Link to="#">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar
