import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Flexbox from '../components/Flexbox'
import WeatherCard from '../components/WeatherCard'
import Callout from '../components/Callout'

import { H1 } from '@blueprintjs/core'

import { updateSelectedLocation } from '../store/actions/searchActions'
import { loadFavoriteWeatherInfo } from '../store/actions/favoriteActions'

export default function Favorites() {
    const dispatch = useDispatch()
    const history = useHistory()
    const favorites = useSelector(state => state.favoriteReducer.favorites) || []
    const favoriteWeatherData = useSelector(state => state.favoriteReducer.favoriteWeatherData) || {}

    useEffect(() => {
        dispatch(loadFavoriteWeatherInfo())
    }, [favorites])

    return (
        <div>
            <H1 style={{color: "white", margin: "2.5vh auto", textAlign: "center"}}>Favorites</H1>
            <Flexbox 
                centerStyle={{
                    justifyContent: "center",
                    width: "100%",
                    alignItems: "stretch"
                }}
                centerItems={[
                    ...(favorites && favorites.length > 0 ?
                    favorites.map((item, i) => {
                        const { isLoading = true, text = "", temp = "", } = favoriteWeatherData[item.key] || {};
                        return <WeatherCard onClick={() => {
                            dispatch(updateSelectedLocation(item))
                            history.push("/")
                        }} isLoading={isLoading} title={item.city} text={text} degree={temp} />
                    })
                    : [
                        <Callout title="No Favorite Locations" intent="primary" icon="star">
                            <p>
                                You don't have any favorite locations, go the homepage and add
                                some favorite locations, then come back here to see a summary of all your
                                favorite locations.
                            </p>
                        </Callout>
                    ])]
                }
            />
        </div>
    )
}
