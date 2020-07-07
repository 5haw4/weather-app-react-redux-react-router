import { SET_FAVORITES, TOGGLE_LOADING_FAV_WEATHER, SET_FAV_WEATHER_DATA } from '../actions/favoriteActions'

const initialState = {
    favorites: [
        /*{
            "key": "",
            "city": "",
            "country": ""
        },*/
    ],
    favoriteWeatherData: {
        /*"<LOCATION-KEY>": {
            text: "",
            temp: "",
        }*/
    }
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FAVORITES:
            return {
                ...state,
                favorites: action.favorites,
            }
        case TOGGLE_LOADING_FAV_WEATHER:
            return {
                ...state,
                favoriteWeatherData: {
                    ...state.favoriteWeatherData,
                    [action.key]: {
                        ...state.favoriteWeatherData[action.key],
                        isLoading: true,
                    }
                },
            }
        case SET_FAV_WEATHER_DATA:
            return {
                ...state,
                favoriteWeatherData: {
                    ...state.favoriteWeatherData,
                    [action.key]: {
                        ...state.favoriteWeatherData[action.key],
                        isLoading: false,
                        ...action.data,
                    }
                },
            }
        default:
            return state;
    }
}

export default Reducer