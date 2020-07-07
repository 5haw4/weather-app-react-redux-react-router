import React from 'react'
import { useSelector } from 'react-redux'

export default function Temp({ temp }) {
    const isTempCels = useSelector(state => state.settingsReducer.isTempCels)
    const finalTemp = Number(isTempCels ? ((temp - 32) / 1.8) : temp).toFixed(0);
    const tempUnit = !isNaN(finalTemp) && (isTempCels ? "C" : "F")
    return (<>{isNaN(finalTemp) ? temp : finalTemp}°{tempUnit}</>)
}
