import { ON_LOGIN_USER } from '../actions/actionTypes';

const initialState = {
    sessionUser: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_LOGIN_USER:
            return {
                ...state,
                sessionUser: action.payload
            }

        default:
            return state;
    }
}

export default authReducer;