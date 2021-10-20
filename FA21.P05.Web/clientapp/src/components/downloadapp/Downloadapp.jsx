import React from 'react'
import appimage from "../../assets/images/appimageupdated.png"
import appstore from "../../assets/images/app-store.png"
import googleplay from "../../assets/images/google-play.png"
import "./Downloadapp.css"
import styled, { keyframes } from 'styled-components'
import { fadeInLeft } from 'react-animations'

const fadeInBig = keyframes`${fadeInLeft}`;

const DownloadApp = () => {
    return (
        <section className="app_section" id="contact">

            <div className="app_image">
                <FadeInAnimation src={appimage} alt="" />
            </div>
            <div className="app_content">
                <h3>Place your order through our app</h3>
                <p>You can easily place your order using our mobile app. Now you can download our app for both iOS and Android mobiles.</p>
                <div className="app_links">
                    <img src={appstore} alt="app-store" />
                    <img src={googleplay} alt="google-store" />
                </div>
            </div>
        </section>
    )
}

export default DownloadApp

const FadeInAnimation = styled.img`
animation: 1s ${fadeInBig}`