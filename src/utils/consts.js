import { getCookie } from "./cookies"

//AccuWeather API
const API_BASE_URL = "https://dataservice.accuweather.com/"
const API_KEY = "YGqnk3lBPGGPr4JN5DRxyG9zkCGGLAOz"
const getApiKey = () => {
    return getCookie(USER_WEATHER_API_KEY_CID) || API_KEY
}
//generating URL for each of the API endpoints
export const generateAutoCompleteUrl = (query) => {
    return `${API_BASE_URL}locations/v1/cities/autocomplete?apikey=${getApiKey()}&q=${query}`
}
export const generateCurConditionByLocKeyUrl = (locKey) => {
    return `${API_BASE_URL}currentconditions/v1/${locKey}?apikey=${getApiKey()}`
}
export const generateFiveDaysForcastUrl = (locKey) => {
    return `${API_BASE_URL}forecasts/v1/daily/5day/${locKey}?apikey=${getApiKey()}`
}
export const generateCurConditionByGeoUrl = (lat, lon) => {
    return `${API_BASE_URL}locations/v1/cities/geoposition/search?apikey=${getApiKey()}&q=${lat},${lon}`
}

//default location when can't use geo-location
export const DEFAULT_LOCATION=  {
    KEY: "215854",
    CITY: "Tel Aviv",
    COUNTRY: "Israel"
}

//cookies
export const COOKIES_EXIRES_IN_DAYS = 365
export const IS_DARK_MODE_CID = "is-dark-mode";
export const FAVORITES_CID = "favorites";
export const IS_TEMP_CELS_CID = "is-temp-fahr";
export const USER_WEATHER_API_KEY_CID = "user-accu-weather-api-key";