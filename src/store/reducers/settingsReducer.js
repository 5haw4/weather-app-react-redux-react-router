import { SET_SETTINGS, TOGGLE_TEMP_UNIT, TOGGLE_DARK_MODE } from '../actions/settingsActions'

const initialState = {
    isTempCels: true,
    isDarkMode: false,
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SETTINGS:
            return {
                ...state,
                ...action.data,
            }
        case TOGGLE_TEMP_UNIT:
            return {
                ...state,
                isTempCels: !state.isTempCels,
            }
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            }
        default:
            return state;
    }
}

export default Reducer