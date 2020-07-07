import { UPDATE_SELECTED_LOCATION, UPDATE_SEARCH_QUERY, TOGGLE_LOADING_LOCATION, 
    SET_LOCATION_DATA, SET_AUTO_COMPLETE_ITEMS, SET_LOCATION_ERROR, 
    LOADING_AUTO_COMPLETE_ITEMS,
} from '../actions/searchActions'

const initialState = {
    searchQuery: "",
    selectedLocation: {
    /*
        key: "",
        city: "",
        country: "",
    */
    },
    locationsData: {
        /*"<LOCATION-KEY>": {
            isLoading: false,
            errorMessage: "",
            overview: {
                key: "",
                city: "",
                country: "",
                overviewText: "",
                link: "",
                temp: ""
                iconId: ""
            },
            fiveDaysForcast: [
                {
                    date: "",
                    temp: "",
                    link: ""
                }
            ],
        }*/
    },
    isLoadingAutoComplete: false,
    autoComplete: [],
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_LOADING_LOCATION:
            return {
                ...state,
                locationsData: {
                    ...state.locationsData,
                    [action.locationKey]: {
                        ...state.locationsData[action.locationKey],
                        isLoading: !!!state.locationsData[action.locationKey],
                    }
                },
            }
        case SET_LOCATION_DATA:
            return {
                ...state,
                locationsData: {
                    ...state.locationsData,
                    [action.location.key]: {
                        ...state.locationsData[action.location.key],
                        errorMessage: "",
                        isLoading: false,
                        overview: action.overview,
                        fiveDaysForcast: action.fiveDaysForcast,
                    }
                },
            }
        case SET_LOCATION_ERROR:
            return {
                ...state,
                locationsData: {
                    ...state.locationsData,
                    [action.key]: {
                        ...state.locationsData[action.key],
                        isLoading: false,
                        errorMessage: action.message,
                    }
                },
            }
        case UPDATE_SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.data,
            }
        case UPDATE_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.value,
            }
        case SET_AUTO_COMPLETE_ITEMS:
            return {
                ...state,
                autoComplete: action.data,
                isLoadingAutoComplete: false,
            }
        case LOADING_AUTO_COMPLETE_ITEMS:
            return {
                ...state,
                isLoadingAutoComplete: true,
            }
        default:
            return state;
    }
}

export default Reducer