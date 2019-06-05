/*In this component, data (historyPrices) is passing just for a specific pair. */
import React from 'react'
import LineChart from '../LineChart/LineChart';
import './PairBox.css';

const PairBox = (props) => {
    const changeP = (props.currentPrice - props.data[0].y) / props.data[0].y * 100; //Percentage change from last.
    const monthChangeP = changeP.toFixed(2) + '%';

    return (
        <div className="pairbox"
            onClick={props.onClick}
            draggable="true"
            onDragStart={props.dragStart.bind(this)}
            id={props.id}
        >
            <div className="d-inline d-flex flex-row align-content-center">
                <img src={`assets/${props.path}`} alt={`${props.title} logo`} style={styles.img} className="mr-2" />
                <p className="pairbox-title mb-0">{props.title}</p>
                <p className="pairbox-short flex-grow-1 mb-0">{props.short}</p>
                <div className="float-right">
                    <p className="text-secondary box-price mb-0">{parseFloat(props.currentPrice).toLocaleString('us-EN', { style: 'currency', currency: props.currency, color: '#777' })}</p>
                </div>
            </div>
            <div className="d-flex flex-row-reverse">
                <p style={{ color: Math.sign(changeP) === -1 ? '#E95F67' : '#0F830C' }}>{monthChangeP}</p>
            </div>

            <LineChart
                onChartHover={false}
                data={props.data}
                svgWidth={props.svgWidth}
                svgHeight={props.svgHeight}
                makeArea={props.makeArea}
                xLabelSize={props.xLabelSize}
                yLabelSize={props.yLabelSize}
                color={props.color}
                strokeWidth={2}
                lineClass={"linechart-pairbox"}
                currency={props.currency}
            />
        </div>
    )

}

const styles = {
    img: {
        width: 30,
        height: 30

    }
}

export default PairBox;
