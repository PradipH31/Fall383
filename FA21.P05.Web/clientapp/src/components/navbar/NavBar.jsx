import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo1.png'
import { itemTotal } from '../../core/helpers/cartHelper';
import { BsFillCartFill } from "react-icons/bs"

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
            <div className="nav-container">
                <Link to="/" className='logo'>
                    <img src={logo} alt='' />
                </Link>
                <input className="menu-btn" type="checkbox" id="menu-btn" />
                <label className="menu-icon" htmlFor="menu-btn">
                    <span className="nav-icon"></span>
                </label>
                <ul className="menu">
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/orders">Booking</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link style={{ display: "inline-block", justifyContent: "center" }} to="/cart"><BsFillCartFill className="cart-menu" fill="#c92800" />  &nbsp;
                        <span>Cart <sup><small
                            className={"badge badge-danger"}>{itemTotal()}</small></sup></span>{' '}</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
