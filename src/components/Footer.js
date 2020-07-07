import React from 'react'

import Flexbox from './Flexbox'
import LinkButton from './LinkButton'

export default function Footer() {
    return (
        <div id="footer">
            <Flexbox 
                style={{height: "100%"}}
                leftItems={[
                    <p style={{color:"white", margin: 0}}>
                        All Rights Reseved Goes Here © {new Date().getFullYear()}
                    </p>
                ]}
                rightItems={[
                    <LinkButton style={{color: "white"}} href="/">Home</LinkButton>,
                    <LinkButton style={{color: "white"}} href="/favorites">Favorites</LinkButton>,
                    <LinkButton style={{color: "white"}} href="https://reactjs.org">ReactJS</LinkButton>,
                    <LinkButton style={{color: "white"}} href="https://react-redux.js.org/">React Redux</LinkButton>,
                    <LinkButton style={{color: "white"}} href="https://developer.accuweather.com/">AccurWeather API</LinkButton>,
                ]}
            />
        </div>
    )
}
