import React from 'react'
import { Card, H3, H4 } from '@blueprintjs/core'

import Temp from './Temp'

export default function WeatherCard({ isLoading, title, text, degree, onClick }) {
    return (
        <Card onClick={() => onClick && onClick()} 
            elevation="5" interactive={!isLoading} style={{margin: "10px"}}>
            <H3 className={isLoading && "bp3-skeleton"} style={{textAlign: "center"}}>{isLoading ? "placeholder" : title}</H3>
            <H4 className={isLoading && "bp3-skeleton"} style={{textAlign: "center"}}>{isLoading ? "placeholder" : text}</H4>
            <H4 className={isLoading && "bp3-skeleton"} style={{textAlign: "center"}}>
                {isLoading ? "placeholder" : (degree ? <Temp temp={degree} /> : degree)}
            </H4>
        </Card>
    )
}
