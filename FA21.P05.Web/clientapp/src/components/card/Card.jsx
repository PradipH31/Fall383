import React from 'react'
// import { Link } from 'react-router-dom'

const Card = ({ item }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={item} alt="" className="multi__image" style={{ width: '100%', height: "150px", objectFit: "contain", marginBottom: "10px", backgroundColor: "#fafafa" }} />
            <p style={{ fontSize: '14px', padding: "5px 0", color: "#442020" }}>This week in Menu</p>
            <p style={{ fontSize: '16px', padding: "5px 0", color: "#ec3c1d" }}>From $12</p>
            <p style={{ fontSize: '14px', padding: "5px 0", color: "#473333" }}>UpTo $5 Off on Fast Food</p>
        </div>
    )
}

export default Card
