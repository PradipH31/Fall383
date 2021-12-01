import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div id="main">
            <div className="header-heading">
                <h3>Giving your Hunger a new Option</h3>
                <h1> <span>PIZZA</span> LIKE <br /> NO OTHER</h1>
                <p className="details">Order it now.</p>
                <div className="header-btns">
                    <Link to="/menu" className="header-btn">Order</Link>
                    {/* <a href="order" className="header-btn">Order</a> */}
                </div>
            </div>
        </div>
    )
}

export default Header
