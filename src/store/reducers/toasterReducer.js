import { ADD_TOAST, REMOVE_FIRST_TOAST } from '../actions/toasterActions'

const initialState = {
    toasts: []
}

const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TOAST:
            return {
                toasts: [...state.toasts, action.toast]
            }
        case REMOVE_FIRST_TOAST:
            return {
                toasts: [...(state.toasts.slice(1))]
            }
        default:
            return state;
    }
}

export default Reducer