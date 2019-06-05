import { ON_MESSAGE_SET } from '../actions/actionTypes';

const initialState = {
    message: null
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_MESSAGE_SET:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}

export default uiReducer;