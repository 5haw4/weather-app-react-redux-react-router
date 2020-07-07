import { DEFAULT_LOCATION, generateFiveDaysForcastUrl, 
    generateAutoCompleteUrl, generateCurConditionByGeoUrl, 
} from '../../utils/consts'
import { ADD_TOAST } from './toasterActions'
import { isStrOnlyLetter } from '../../utils/utils';

//update search query 
export const UPDATE_SEARCH_QUERY = "UPDATE_SEARCH_QUERY";
//update selected location 
export const UPDATE_SELECTED_LOCATION = "UPDATE_SELECTED_LOCATION";

//toggle the loading state of a location
export const TOGGLE_LOADING_LOCATION = "TOGGLE_LOADING_LOCATION"
//setting a location's data
export const SET_LOCATION_DATA = "SET_LOCATION_DATA"
//setting a location's error to load data
export const SET_LOCATION_ERROR = "SET_LOCATION_ERROR"

//loading input auto complete items
export const LOADING_AUTO_COMPLETE_ITEMS = "LOADING_AUTO_COMPLETE_ITEMS"
//setting input auto complete items
export const SET_AUTO_COMPLETE_ITEMS = "SET_AUTO_COMPLETE_ITEMS"

//selecting new location to show on the homepage
export const updateSelectedLocation = (item) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_SELECTED_LOCATION, data: {
            key: item.key || DEFAULT_LOCATION.KEY,
            city: item.city || DEFAULT_LOCATION.CITY,
            country: item.country || DEFAULT_LOCATION.COUNTRY,
        } })
    }
}

//updating the search query
export const updateSearchQuery = (value) => {
    return (dispatch) => {
        if(isStrOnlyLetter(value) || value == "") {
            dispatch({ type: UPDATE_SEARCH_QUERY, value })
        }
    }
}

//getting location data by its location key
export const getLocationData = (item = DEFAULT_LOCATION) => {
    return (dispatch, getState) => {
        const { locationsData = {} } = getState().searchReducer;
        const curLocData = locationsData[item.key] || {}
        
        //already loading or already loaded
        if(curLocData.isLoading || 
            (!!curLocData.overview && !!curLocData.fiveDaysForcast)) return            
        
        dispatch({ type: TOGGLE_LOADING_LOCATION, locationKey: item.key })

        //fetching location data
        fetch(generateFiveDaysForcastUrl(item.key)).then(r => r.json())
        .then(res => {
            const minTemp = res.DailyForecasts[0].Temperature.Minimum.Value
            const maxTemp = res.DailyForecasts[0].Temperature.Maximum.Value
            const avgTemp = (minTemp + maxTemp) / 2
            let overview = {
                ...item,
                overviewText: res.Headline.Text,
                link: res.Headline.Link,
                temp: isNaN(avgTemp) ? minTemp || maxTemp : avgTemp,
                iconId: res.DailyForecasts[0].Day.Icon,
            }
            let fiveDaysForcast = res.DailyForecasts.map(item => {
                const minTemp = item.Temperature.Minimum.Value
                const maxTemp = item.Temperature.Maximum.Value
                const avgTemp = (minTemp + maxTemp) / 2
                return {
                    date: item.EpochDate,
                    temp: isNaN(avgTemp) ? minTemp || maxTemp : avgTemp,
                    link: item.Link
                }
            })            
            dispatch({ type: SET_LOCATION_DATA, location: item, 
                overview, fiveDaysForcast })
        })
        .catch(({ message = "Unknown error occurred" }) => {
            dispatch({ type: SET_LOCATION_ERROR, key: item.key, message })
        })
    }
}

//loading auto complete items
export const loadAutoComplete = () => {
    return (dispatch, getState) => {
        const { searchQuery } = getState().searchReducer
        if(!searchQuery) return
        //toggle loading
        dispatch({ type: LOADING_AUTO_COMPLETE_ITEMS })

        //load auto complete
        fetch(generateAutoCompleteUrl(searchQuery)).then(r => r.json())
        .then(res => {
            const data = res.map(item => ({
                key: item.Key,
                city: item.LocalizedName,
                country: item.Country.LocalizedName,
            })).filter(item => (item.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.country.toLowerCase().includes(searchQuery.toLowerCase())))
            dispatch({ type: SET_AUTO_COMPLETE_ITEMS, data })
        }).catch(err => {
            dispatch({ type: SET_AUTO_COMPLETE_ITEMS, data: [] })
        })
    }
}

//getting user geo-loc from the browser - on error selecting the default location
export const getUserGeolocation = () => {
    return (dispatch) => {
        const error = (message) => {
            dispatch({ type: ADD_TOAST, toast: message })
            dispatch(updateSelectedLocation(DEFAULT_LOCATION))
        }
        if(!navigator.geolocation) {
            error("Geolocation is not supported by your browser")
        } else {
            dispatch({ type: ADD_TOAST, toast: { intent: "PRIMARY", icon: "locate", 
                message: "Locating...", timeout: 1500 } })
            navigator.geolocation.getCurrentPosition((position) => { //success
                const latitude  = position.coords.latitude;
                const longitude = position.coords.longitude;
                dispatch(getGeolocationData(latitude, longitude))
            }, () => error("Unable to retrieve your location"))
        }
    }
}

//loading geo-loc data for given lat and long
export const getGeolocationData = (latitude, longitude) => {
    return (dispatch) => {
        fetch(generateCurConditionByGeoUrl(latitude, longitude)).then(r => r.json())
        .then(res => {
            dispatch(updateSelectedLocation({
                key: res.Key, 
                city: res.LocalizedName, 
                country: res.Country.LocalizedName
            }))
        }).catch(({ message = "Unknown error occurred" }) => {
            dispatch({ type: ADD_TOAST, toast: `${message}, loading default location...` })
            dispatch(updateSelectedLocation(DEFAULT_LOCATION))
        })
    }
}
