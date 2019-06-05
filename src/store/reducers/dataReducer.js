import {
    ON_SET_HISTORY_PRICES,
    ON_SET_CURRENT,
    ON_SET_PRICES,
    ON_GET_CURRENCY_PAIRS
} from '../actions/actionTypes';

const initialState = {
    historyPrices: [],
    currentPrices: [],
    currencyPairs: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_SET_HISTORY_PRICES:
            return {
                ...state,
                historyPrices: action.payload
            }
        case ON_SET_CURRENT:
            return {
                ...state,
                currentPrices: action.payload
            }
        case ON_SET_PRICES:
            return {
                ...state,
                prices: action.payload
            }
        case ON_GET_CURRENCY_PAIRS:
            return {
                ...state,
                currencyPairs: action.payload
            }
        default: return state;
    }
};

export default dataReducer;