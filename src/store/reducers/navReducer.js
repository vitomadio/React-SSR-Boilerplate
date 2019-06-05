import { ON_CHANGED_ROUTE } from '../actions/actionTypes';

const initialState = {
    route: null
}

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_CHANGED_ROUTE:
            return {
                ...state,
                route: action.payload
            }

        default: return state
    }
};

export default navReducer;