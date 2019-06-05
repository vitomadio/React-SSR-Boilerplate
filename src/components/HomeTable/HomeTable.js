import React from 'react';
import './HomeTable.css';
import RingLoader from '../RingLoader/RingLoader';
import LineChart from '../LineChart/LineChart';

const HomeTable = (props) => {
  // const fetchingData = props.fetchingData;
  const changePrices = []
  if (props.currentPrices.length >= 1 && props.data.length >= 1) {
    const currentPrices = props.currentPrices;
    const currents = []; //List of currentPrices amounts in float.
    props.pairs.map(pair => {
      const currentPrice = currentPrices.filter(current => current.base === pair.pair)[0].amount;
      const lastPrice = props.data.filter(item => item.pair === pair.pair)[0].y;
      currents.push(parseFloat(currentPrice));
      changePrices.push((parseFloat(currentPrice) - lastPrice) / lastPrice * 100);
    })
  }

  return (

    <table style={styles.table}>
      <tbody>
        <tr style={{ borderBottom: '1px solid #CCC' }}>
          <th className="pl-3">#</th>
          <th className="text-left py-3 pl-5">NAME</th>
          <th className="py-3">PRICE</th>
          <th className="py-3">CHANGE</th>
          <th className="py-3 text-left pl-4">CHART</th>
        </tr>
        {props.currentPrices.length >= 1 && props.data.length >= 1 ?
          props.pairs.map((pair, i) => {
            if (i < 5) {
              return (
                <tr key={i} style={{ borderBottom: i < 4 ? '1px solid #CCC' : '0px solid #CCC' }}>
                  <td className="pl-3">{i + 1}</td>
                  <td className="text-left no-gutters row">
                    <div style={styles.iconSpan} className="col-auto text-center px-0">
                      <img src={`assets/${pair.path}`} style={styles.icons} className="crypto-icons" />
                    </div>
                    <div className="col-auto pl-0">
                      {pair.name}
                    </div>
                    <div style={styles.abreviations} className="col-auto pl-0">
                      {pair.pair}
                    </div>
                  </td>
                  <td style={{ color: '#555' }}>{parseFloat(props.currentPrices.filter(price => price.base === pair.pair)[0].amount).toLocaleString('us-EN', { style: 'currency', currency: 'USD' })} </td>
                  <td style={{ color: Math.sign(changePrices[i]) === -1 ? '#E95F67' : '#0F830C' }}>{changePrices[i].toFixed(2) + "%"}</td>
                  <td className="text-left">
                    <LineChart
                      onChartHover={false}
                      data={props.data.filter(item => item.pair === pair.pair)}
                      svgWidth={100}
                      svgHeight={27}
                      makeArea={false}
                      xLabelSize={0}
                      yLabelSize={0}
                      color={Math.sign(changePrices[i]) === -1 ? '#E95F67' : '#0F830C'}
                      strokeWidth={1}
                      currency={props.currency}
                    />
                  </td>
                </tr>
              )
            }
          })
          :
          props.pairs.map((pair, i) => {
            if (i < 5) {
              return (
                <tr key={i} style={{ borderBottom: i < 4 ? '1px solid #CCC' : '0px solid #CCC' }}>
                  <td className="pl-3">{i + 1}</td>
                  <td className="text-left no-gutters row">
                    <div style={styles.iconSpan} className="col-auto text-center px-0">
                      <img src={`assets/${pair.path}`} style={styles.icons} className="crypto-icons" />
                    </div>
                    <div className="col-auto pl-0">
                      {pair.name}
                    </div>
                    <div style={styles.abreviations} className="col-auto pl-0">
                      {pair.pair}
                    </div>
                  </td>
                  <td style={{ color: '#555' }}>

                  </td>
                  <td >

                  </td>
                  <td className="text-left">
                    <RingLoader
                      color={"#007bff"}
                      size={40}
                      innerColor={"#fff"}
                      innerSize={30}
                    />
                  </td>
                </tr>
              )
            }
          })
        }
      </tbody>
    </table>
  )
}

const styles = {
  table: {
    width: '100%',
    borderRadius: 18,
    backgroundColor: '#fff',
    boxShadow: '0px 4px 6px rgba(0,0,0,.2)',
    marginTop: -80
  },
  iconSpan: {
    width: 50,
    padding: '0px 15px',
    justifyContent: 'center'
  },
  icons: {
    maxWidth: 40,
    maxHeight: 40,
    textAlign: 'center'
  },
  abreviations: {
    color: '#AAA',
    marginLeft: '1em'
  },
  ethereum: {
    maxWidth: 40,
    maxHeight: 40,
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5
  }
}

export default HomeTable;
