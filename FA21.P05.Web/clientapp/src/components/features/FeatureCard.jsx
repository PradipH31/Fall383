import React from 'react'

const FeatureCard = ({ title, image, subTitle }) => {
    return (
        <div className="a-box">
            <div className="a-b-img">
                <img src={image} alt="features" />
            </div>
            <div className="s-b-text">
                <h2>{title}</h2>
                <p>{subTitle}</p>
            </div>
        </div>
    )
}

export default FeatureCard
