import { getCookie, setCookie } from "../../utils/cookies"
import { IS_DARK_MODE_CID, IS_TEMP_CELS_CID } from "../../utils/consts"

export const SET_SETTINGS = "SET_SETTINGS"
export const TOGGLE_TEMP_UNIT = "TOGGLE_TEMP_UNIT"
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE"

//toggling the temp unit (if it's celsius or not)
export const toggleTempUnit = () => {
    return (dispatch, getState) => {
        const { isTempCels = false } = getState().settingsReducer
        //updating the cookie
        setCookie(IS_TEMP_CELS_CID, !!!isTempCels)
        //toggling the reducer
        dispatch({ type: TOGGLE_TEMP_UNIT })
    }
}
//toggling dark mode
export const toggleDarkMode = () => {
    return (dispatch, getState) => {
        const { isDarkMode = false } = getState().settingsReducer
        //updating the cookie
        setCookie(IS_DARK_MODE_CID, !!!isDarkMode)
        //toggling the dark mode for the UI
        document.body.classList.toggle('bp3-dark', !!!isDarkMode)
        //toggling the reducer
        dispatch({ type: TOGGLE_DARK_MODE })
    }
}

//loading the saved settings from cookies into the state
export const loadSettingsFromCookie = () => {
    return (dispatch) => {
        //getting data from cookies
        const isDarkMode = getCookie(IS_DARK_MODE_CID) == "true"
        const isTempCels = getCookie(IS_TEMP_CELS_CID) == "true"

        //toggling the dark mode in the UI
        document.body.classList.toggle('bp3-dark', isDarkMode)
        
        dispatch({ type: SET_SETTINGS, data: {
            isDarkMode, isTempCels 
        } })
    }
}