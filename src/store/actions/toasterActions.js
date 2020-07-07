
//adding toasts
export const ADD_TOAST = "ADD_TOAST"
//removing the first toast in array
export const REMOVE_FIRST_TOAST = "REMOVE_FIRST_TOAST"

//removing the first toast in the array - it was just fired
export const removeFirstToast = () => {
    return (dispatch) => {
        dispatch({ type: REMOVE_FIRST_TOAST })
    }
}

//add toast to reducer
export const addToast = (toast = "Unknown error occurred") => {
    return (dispatch) => {
        dispatch({
            type: ADD_TOAST, toast
        })
    }
}