import { FAVORITES_CID, generateCurConditionByLocKeyUrl } from '../../utils/consts'
import { getCookie, setCookie } from '../../utils/cookies'

//setting favorites
export const SET_FAVORITES = "SET_FAVORITES"
//toggling the loading state of a favorite
export const TOGGLE_LOADING_FAV_WEATHER = "TOGGLE_LOADING_FAV_WEATHER"
//setting in state a favorite's data
export const SET_FAV_WEATHER_DATA = "SET_FAV_WEATHER_DATA"

//toggling favorite location
export const toggleFavoriteLocation = (item) => {
    return (dispatch, getState) => {
        let { favorites } = getState().favoriteReducer
        const isFavorite = !!favorites.find(el => el.key == item.key);
        if(isFavorite) {
            favorites = favorites.filter(el => el.key != item.key)
        } else {
            favorites.push(item)
        }
        setCookie(FAVORITES_CID, JSON.stringify(favorites))
        dispatch({ type: SET_FAVORITES, favorites })
    }
}

//loading the favorite list from the cookie into the state
export const loadFavoritesFromCookie = () => {
    return (dispatch) => {
        let favorites;
        try{
            favorites = JSON.parse(getCookie(FAVORITES_CID)) || []
        } catch(err) {
            favorites = []
        }
        dispatch({ type: SET_FAVORITES, favorites })
    }
}

//loading the favorites weather info
export const loadFavoriteWeatherInfo = () => {
    return (dispatch, getState) => {
        const { favorites = [], favoriteWeatherData = [] } = getState().favoriteReducer
        favorites.forEach(item => {
            const curItemData = favoriteWeatherData[item.key]
            if(!curItemData) {
                //set loading
                dispatch({ type: TOGGLE_LOADING_FAV_WEATHER, key: item.kew })

                fetch(generateCurConditionByLocKeyUrl(item.key)).then(r => r.json())
                .then(res => {
                    //send data to reducer
                    dispatch({ type: SET_FAV_WEATHER_DATA, key: item.key, data: {
                        temp: res[0].Temperature.Imperial.Value,
                        text: res[0].WeatherText
                    } })
                }).catch(err => {
                    dispatch({ type: SET_FAV_WEATHER_DATA, key: item.key, data: {
                        temp: "",
                        text: "Error occurred"
                    } })
                })
            }
        });
    }
}
