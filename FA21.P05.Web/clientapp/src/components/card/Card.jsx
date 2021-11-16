import React from 'react'
// import { Link } from 'react-router-dom'

const Card = ({ item }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={item.imageLink} alt="" className="multi__image" style={{ width: '100%', height: "150px", objectFit: "contain", marginBottom: "10px", backgroundColor: "#fafafa" }} />
            <p style={{ fontSize: '16px', padding: "5px 0", color: "#442020" }}>{item.name}</p>
            <p style={{ fontSize: '13px', padding: "5px 0", color: "#ec3c1d" }}>{item.description}</p>
            <p style={{ fontSize: '15px', padding: "5px 0", color: "#473333" }}> <span>$</span> {item.price}</p>
        </div>
    )
}

export default Card
