import React from 'react'
import FeatureCard from './FeatureCard'
import fasthomedelivery from "../../assets/images/fasthomedelivery.jpg"
import quality from "../../assets/images/quality.png"
import easy2order from "../../assets/images/easy2order.jpg"

const Feature = () => {
    return (
        <div id="features">
            <div className="s-container">
                <span>what we serve</span>
                <h1>Fresh food at your fingertips</h1>
            </div>
            <div className="a-container">
                <FeatureCard image={easy2order} title="Easy To Order" subTitle="The food of your choice" />
                <FeatureCard image={fasthomedelivery} title="Fastest Delivery" subTitle="Good food within minutes." />
                <FeatureCard image={quality} title="Best Quality" subTitle="Best service to fulfil your expectations." />
            </div>
        </div>
    )
}

export default Feature
