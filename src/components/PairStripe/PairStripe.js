/*In this component, data (historyPrices) is passing just for a specific pair. */
import React from 'react'
import LineChart from '../LineChart/LineChart';
import './PairStripe.css';
import GripSVG from '../GripSVG/GripSVG';

const PairBox = (props) => {
    const changeP = (props.currentPrice - props.data[0].y) / props.data[0].y * 100; //Percentage change from last.
    const monthChangeP = changeP.toFixed(2) + '%';
    const windowWidth = window.innerWidth;
    return (
        <div className="pairStripe"
            onClick={props.onClick}
            draggable="true"
            onDragStart={props.dragStart.bind(this)}
            id={props.id}
        >
            <div className="row align-content-center justify-content-between">
                <div className="col-4 d-flex">
                    <div className="col-auto pr-0 pl-0 pl-md-2">
                        <img src={`assets/${props.path}`} alt={`${props.title} logo`} style={{ height: windowWidth >= 768 ? 30 : 25, width: windowWidth >= 768 ? 30 : 25 }} />
                    </div>
                    <div className="col-auto pr-0 pl-1 pl-md-2 pairstripe-title">
                        {props.title}
                    </div>
                    <div className="col-auto pl-1 pl-md-2 pairstripe-short">
                        {props.short}
                    </div>
                </div>
                <div className="col-auto text-secondary box-price mb-0 ">
                    {parseFloat(props.currentPrice).toLocaleString('us-EN', { style: 'currency', currency: props.currency, color: '#777' })}
                </div>
                <div className="col-auto"
                    style={{ color: Math.sign(changeP) === -1 ? '#E95F67' : '#0F830C' }}>
                    {monthChangeP}
                </div>
                <div className="col-2" ref={props.lineChartStripeRef}>
                    {typeof props.svgWidth === 'number' ?
                        <LineChart
                            onChartHover={false}
                            data={props.data}
                            svgWidth={props.svgWidth}
                            svgHeight={props.svgHeight}
                            makeArea={props.makeArea}
                            xLabelSize={props.xLabelSize}
                            yLabelSize={props.yLabelSize}
                            color={Math.sign(changeP) === -1 ? '#E95F67' : '#0F830C'}
                            strokeWidth={1}
                            lineClass={"linechart-pairbox"}
                            currency={props.currency}
                        />
                        : null
                    }
                </div>
                <div className="col-auto">
                    <GripSVG
                        radius={4}
                        width={21}
                        height={30}
                    />
                </div>
            </div>
        </div>
    )
}

export default PairBox;
