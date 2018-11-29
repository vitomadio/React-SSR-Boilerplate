/*
These Reducers are from initial boilerplate, do not remove.
*/

import { INITIALIZE_SESSION, STORE_DATA } from '../actions/actionTypes';

const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case INITIALIZE_SESSION:
            return true;
        default: return state;
    }
};

export default sessionReducer;