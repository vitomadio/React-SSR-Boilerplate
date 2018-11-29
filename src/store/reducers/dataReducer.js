import { INITIALIZE_SESSION, STORE_DATA } from '../actions/actionTypes';

const dataReducer = ( state = [ ], action ) => {
    switch ( action.type ) {
        case STORE_DATA:
            return action.data;
        default: return state;
    }
};

export default dataReducer;