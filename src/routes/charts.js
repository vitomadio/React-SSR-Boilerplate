const express = require('express');
const router = express.Router();
const moment = require('moment');
const pairs = require('../currencyPairs');

var Client = require('coinbase').Client;
var client = new Client({
    'apiKey': process.env.API_KEY,
    'apiSecret': process.env.API_SECRET
});

//GET CURRENT REATE OF A PAIR.
router.get('/rates', (req, res) => {
    const rates = [];
    const currencies = ["USD", "EUR", "GBP"];
    const getRates = new Promise((resolve, reject) => {
        try {
            for (let x = 0; x < currencies.length; x++) {
                for (let i = 0; i < pairs.length; i++) {
                    getCurrentRate(`${pairs[i].pair}-${currencies[x]}`)
                        .then(({ data }) => {
                            rates.push(data)
                            if (rates.length == pairs.length * currencies.length) {
                                return resolve(rates)
                            }
                        })
                        .catch(err => resolve(err));
                }
            }
        }
        catch (err) { return reject(err) }
    })
    //Call Promise.
    getRates
        .then(data => {
            console.log(data)
            if (Array.isArray(data) === false) {
                return res.send(data);
            }
            const prices = [];
            pairs.map((c_pair, i) => {
                data.map((item, x) => {
                    if (item.base === c_pair.pair) {
                        prices.push(item)
                    }
                })
            })
            res.send(prices);
        })
        .catch(err => send(err));
});

//GET ALL PAIRS RATES.
router.post('/all-rates', (req, res) => {
    const currency = req.body.currency;
    const rates = [];
    const getRates = new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < pairs.length; i++) {
                getCurrentRate(`${pairs[i].pair}-${currency}`)
                    .then(({ data }) => {
                        rates.push(data)
                        if (rates.length == pairs.length) {
                            return resolve(rates)
                        }
                    })
                    .catch(err => resolve(err));
            }
        }
        catch (err) { return reject(err) }
    })
    //Call Promise.
    getRates
        .then(data => {
            res.send(data);
        })
        .catch(err => send(err));
});

//GET ALL HISTORY PRICES PAIRS.
router.post('/history-prices', (req, res) => {
    const currency = req.body.currency;
    const dates = getDates();
    const data = [];
    const setData = new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < dates.length; i++) {
                for (let x = 0; x < pairs.length; x++) {
                    getHistoryData(`${pairs[x].pair}-${currency}`, dates[i].date)
                        .then(response => {
                            data.push({ amount: response.data.amount, idx: i, date: dates[i].date, pair: pairs[x].USD })
                            if (data.length == dates.length * pairs.length) {
                                return resolve(data);
                            }
                        })
                        .catch(err => reject(err))
                }
            }
        }
        catch (err) { return reject(err) }
    });
    //Call Promise.
    setData
        .then(dataResponse => {
            if (Array.isArray(dataResponse) === false) {
                return res.send(dataResponse);
            }
            const orderedData = dataResponse.sort(reorderData);
            const prices = [];
            pairs.map((c_pair, x) => {
                orderedData.map((item, i) => {
                    if (item.pair == c_pair.USD) {
                        prices.push(item)
                    }
                })
            })
            res.send(prices);
        })
        .catch(err => res.send(err))
});

module.exports = router;

//UTILITIES: =======================================

//GET DATES FROM A MONTH NOW.
const getDates = () => {
    var actualMth = new Date(Date.now());
    var prevDate = new Date(Date.now()).getMonth() - 1;
    var prevMth = new Date(Date.now()).setMonth(prevDate);
    var currentDate = prevMth;
    var stopDate = actualMth.getTime();

    var dates = [];
    while (currentDate <= stopDate) {
        dates.push({ date: moment(currentDate).format('YYYY-MM-DD') });
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dates;
}
//ORDER DATA ASCENDING.
const reorderData = (a, b) => {
    if (a.idx > b.idx) { return 1 };
    if (a.idx < b.idx) { return -1 };
    return 0
}

//GET HISTORY PAIR PRICE.
const getHistoryData = (pair, date) => new Promise((resolve, reject) => {
    try {
        client.getSpotPrice({ 'currencyPair': pair, 'date': date }, (err, price) => {
            if (err) {
                console.log(err);
            }
            return resolve(price);
        });
    }
    catch (err) { console.log(err); }
});

//GET CURRENT RATE.
const getCurrentRate = (pair) => new Promise((resolve, reject) => {
    try {
        client.getSpotPrice({ 'currencyPair': pair }, (err, price) => {
            if (err) {
                console.log(err);
            }
            return resolve(price);
        });
    }
    catch (err) { console.log(err); }
});


