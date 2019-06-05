import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
    ON_SET_HISTORY_PRICES,
    ON_SET_CURRENT, ON_SET_PRICES,
    ON_GET_CURRENCY_PAIRS
} from './actionTypes';
import moment from 'moment';
// import pairs from '../../currencyPairs';

axiosRetry(axios, { retries: 3 });

//GET ALL CURRENCY PAIRS LIST.
export const getCurrencyPairs = () => {
    return dispatch => {
        return axios.get('/currency-pairs')
            .then(({ data }) => {
                const currencyPairs = [];
                data.forEach(currencyPair => {
                    currencyPairs.push({
                        pair: currencyPair.pair,
                        USD: currencyPair.usd,
                        EUR: currencyPair.eur,
                        GBP: currencyPair.gbp,
                        name: currencyPair.name,
                        color: currencyPair.color,
                        path: currencyPair.path
                    })
                })
                dispatch(setCurrencyPairs(currencyPairs))
                return currencyPairs
            })
            .catch(err => console.log(err))
    }
}

//SET CURRENCY PAIRS TO STORE.
const setCurrencyPairs = (currencyPairs) => {
    return {
        type: ON_GET_CURRENCY_PAIRS,
        payload: currencyPairs
    }
}
//CHANGE CURRENCY PAIRS LIST ORDER.
export const changeListOrder = (old_idx, new_idx) => {
    return dispatch => {
        axios.post('/currency-pairs/update', { old_idx: old_idx, new_idx: new_idx })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => console.log(err))
    }
}

//GET ALL RATES.
export const getAllPrices = () => {
    return dispatch => {
        axios.get('/charts/rates')
            .then(({ data }) => {
                dispatch(setPrices(data))
            })
            .catch(err => console.log(err))
    }
}

//SET PRICES IN STORE
const setPrices = (data) => {
    return {
        type: ON_SET_PRICES,
        payload: data
    }
}

//GET ALL CURRENT RATES BY SPECIFIC CURRENCY.
export const getAllCurrenciesCurrentPrices = (currency) => {
    return dispatch => {
        return axios.post('/charts/all-rates', { currency: currency })
            .then(({ data }) => {
                dispatch(setCurrentPrices(data));
            })
            .catch(err => console.log(err.response))
    }
}

//SET CURRENT PRICES IN STORE
const setCurrentPrices = (data) => {
    return {
        type: ON_SET_CURRENT,
        payload: data
    }
}

//GET ALL HISTORY PAIR RATES.
export const getAllCurrenciesHistoryPrices = (currency) => {
    return dispatch => {
        return axios.post('/charts/history-prices', { currency: currency })
            .then(({ data }) => {
                const sortedData = [];
                data.forEach((item) => {
                    sortedData.push({
                        pair: item.pair.split('-')[0],
                        d: moment(item.date).format('MMM DD'),
                        p: item.amount.toLocaleString('us-EN', { style: 'currency', currency: currency }),
                        x: item.idx,
                        y: parseFloat(item.amount)
                    })
                });
                dispatch(setHistoryPrices(sortedData));
            })
            .catch(err => console.log(err.response, "from action"))
    }
}

//SET ALL HISTORIC RATES TO STORE.
const setHistoryPrices = (data) => {
    return {
        type: ON_SET_HISTORY_PRICES,
        payload: data
    }
}

