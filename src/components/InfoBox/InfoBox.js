import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCurrenciesCurrentPrices } from '../../store/actions';
import moment from 'moment';

import './InfoBox.css';

class InfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: null,
            monthChangeD: null,
            monthChangeP: null,
            updatedAt: null
        }
    }

    render() {
        const extData = this.props.historyPrices.filter(price => price.pair === this.props.pair.pair);
        const data = this.props.currentPrices.filter(price => price.base === this.props.pair.pair)[0];
        const changeP = (data.amount - extData[0].y) / extData[0].y * 100;
        const currentPrice = data.amount;
        const monthChangeD = extData[0].y;
        const monthChangeP = changeP.toFixed(2) + '%';
        const updatedAt = new Date(Date.now());

        return (
            <div>
                {this.props.pair ?
                    <div id="middle" className='col-md-12 text-center box'>
                        <div className="heading" style={{ color: '#2196F3' }}>{parseFloat(currentPrice).toLocaleString('us-EN', { style: 'currency', currency: this.props.currency, minimumFractionDigits: 4, maximumFractionDigits: 4 })}</div>
                        <div className="subtext">{'Updated ' + moment(updatedAt).fromNow()}</div>
                    </div>
                    : null}
                {this.props.pair ?
                    <div id="middle" className='col-md-12 text-center box' >
                        <div className="heading" style={{ color: '#aaa' }}>{parseFloat(monthChangeD).toLocaleString('us-EN', { style: 'currency', currency: this.props.currency, minimumFractionDigits: 4, maximumFractionDigits: 4 })}</div>
                        <div className="subtext">Change Since Last Month (USD)</div>
                    </div>
                    : null}
                {monthChangeP &&
                    <div id="right" className='col-md-12 text-center box'>
                        <div className="heading" style={{ color: Math.sign(monthChangeP) === -1 ? '#E95F67' : '#0F830C' }}>{monthChangeP}</div>
                        <div className="subtext">Change Since Last Month (%)</div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentPrices: state.data.currentPrices,
        historyPrices: state.data.historyPrices
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCurrenciesCurrentPrice: () => dispatch(getAllCurrenciesCurrentPrices())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);