import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineChart from '../components/LineChart/LineChart';
import InfoBox from '../components/InfoBox/InfoBox';
import ToolTip from '../components/ToolTip/ToolTip';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import PairBox from '../components/PairBox/PairBox';
import PairStripe from '../components/PairStripe/PairStripe';
import { getAllCurrenciesCurrentPrices, getAllCurrenciesHistoryPrices, getCurrencyPairs, changeListOrder } from '../store/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { MdMenu } from 'react-icons/md';
import { IoMdApps } from 'react-icons/io';

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.lineChartRef = React.createRef();
    this.lineChartStripeRef = React.createRef();
    this.lineChartModalRef = React.createRef();
    this.infoBoxRef = React.createRef();

    this.state = {
      data: [],
      currentPrice: null,
      fetchingData: true,
      hoverLoc: null,
      activePoint: null,
      marginTop: null,
      modal: false,
      svgWidth: null,
      updatedAt: null,
      color: null,
      pair: null,
      currency: "USD",
      pairBoxMode: true,
      windowWidth: null,
      pairs: null
    }
  }

  componentDidMount() {
    this._isMounted = true;
    //Get window width and pass it to state.
    const windowWidth = window.innerWidth;
    this.setState({
      windowWidth: windowWidth,
    });

    this.props.onGetCurrencyPairs()
      .then(data => {
        this.setState({
          pairs: data
        })
      })
      .catch(err => console.log(err))


    //GETS ALL HISTORY PRICES.
    if (this.props.historyPrices.length < 1) {
      this.getHistoryPrices();
    }
    //GET CURRENT PRICES.
    if (this.props.currentPrices.length < 1) {
      this.getCurrentPrices();
    }
    //GET SVG BOX WIDTH AND HEIGHT.

    this.getLineChartWidth();
    //GET SVG STRIPE WIDTH AND HEIGHT.
    this.getLineChartSrtipeWidth();

  }

  //GET ALL HISTROY PRICES.
  getHistoryPrices = () => {
    this.props.getAllCurrenciesHistoryPrices(this.state.currency) //Send currency as property, by default "USD".
  }

  //GET CURRENT PRICES.
  getCurrentPrices = () => {
    this.getData = () => { //Get current price info.
      this.props.onGetAllCurrenciesCurrentPrices(this.state.currency) //Send currency as property, by default "USD".
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }

  //Clear interval before unmount.
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.refresh);
  }

  //For hover event.
  handleChartHover(hoverLoc, activePoint) {
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }

  //Open/Close chart modal.
  toggleChartModal = (pairData) => {
    if (pairData) {
      const pair = this.state.pairs.filter(pair => pair.pair === pairData[0].pair)[0];
      this.setState(prevState => ({
        modal: !prevState.modal,
        pair: pair,
      }), () => {
        setTimeout(() => {
          this.getLineChartModalWidth();
        }, 400)
      })
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
    }
  }

  //Gets svg width dynamically depends on column's wide.
  getLineChartWidth = () => {
    if (this.lineChartRef.current) {
      this.setState({
        svgWidth: this.lineChartRef.current.offsetWidth - 30,
        fetchingData: false
      })
    }
  }

  //Gets svg width dynamically depends on column's wide.
  getLineChartSrtipeWidth = () => {
    if (this.lineChartStripeRef.current) {
      this.setState({
        svgWidth: this.lineChartStripeRef.current.offsetWidth,
        fetchingData: false
      })
    }
  }

  //Gets svg from modal width dynamically depends on column's wide.
  getLineChartModalWidth = () => {
    if (this.lineChartModalRef.current) {
      const lineChartWidth = this.lineChartModalRef.current.offsetWidth - 30;
      this.setState({
        lineChartWidth: lineChartWidth
      })
    }
  }

  //Changes the date range for the charts (Day, week, month).
  changeChartRange = (range, e) => {
    //Change the button background color adding a class.
    const buttons = e.target.parentNode.children
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('innerBtnGrp');
      if (i === buttons.length - 1) {
        e.target.classList.add("innerBtnGrp");
      }
    }
  }

  //CHANGE PAIR OF THE CHART (USD, EUR, GBP).
  changePairRange = (pair, e) => {
    //Change the button background color adding a class.
    const buttons = e.target.parentNode.children
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('innerBtnGrp');
      if (i === buttons.length - 1) {
        e.target.classList.add("innerBtnGrp");
      }
    }
    this.setState({ currency: pair }, () => {
      this.getCurrentPrices();
      this.getHistoryPrices();
    })
  }

  //CHANGES VIEW MODE "STRIPES OR BOXES"
  toggleViewModehandler = (bool) => {
    this.setState({
      pairBoxMode: bool,
      fetchingData: true
    }, () => {
      if (bool === false) {
        this.getLineChartSrtipeWidth();
      } else {
        this.getLineChartWidth();
      }
    })
  }

  //CHANGE CRYPTO POSITIONS BY DRAG AND DROP.
  dragStart(e) {
    e.dataTransfer.setData("src", e.target.id);
  };

  allowDrop(e) {
    e.preventDefault();
  };

  //On drop function after dropping an element on its position.
  onDropSwap(e) {
    var old_idx = e.dataTransfer.getData("src");
    var new_idx = e.currentTarget.id
    console.log(old_idx, new_idx)
    var newArray = this.array_move(this.state.pairs, old_idx, new_idx)

    this.setState({ pairs: newArray })
    this.props.changeListOrder(old_idx, new_idx);
  };

  //Swapping array position after drop.
  array_move = (arr, old_index, new_index) => {
    const tmpIdx = arr[old_index];
    arr.splice(old_index, 1, arr[new_index]);
    arr.splice(new_index, 1, tmpIdx);
    return arr;
  };

  render() {
    const {
      fetchingData,
      hoverLoc,
      activePoint,
      pair,
      currency,
      svgWidth,
      windowWidth,
      lineChartWidth
    } = this.state;
    const currentPrices = this.props.currentPrices;
    const historyData = this.props.historyPrices;
    const pairs = this.state.pairs || this.props.pairs;
    let currencyPairs = pairs.map((item, i) => {
      return (
        <div className="col-12 col-md-4 p-2"
          key={i}
          id={i}
          ref={this.lineChartRef}
          onDrop={this.onDropSwap.bind(this)}
          onDragOver={this.allowDrop.bind(this)}
          draggable="false"
        >
          {historyData && svgWidth ?
            <PairBox
              id={i}
              dragStart={(e) => this.dragStart(e)}
              onClick={this.toggleChartModal.bind(this, historyData.filter(data => data.pair === item.pair))}
              title={item.name}
              short={item.pair}
              path={item.path}
              color={item.color}
              data={this.props.historyPrices.filter(data => data.pair === item.pair)}
              svgWidth={svgWidth - 32}
              svgHeight={svgWidth * 0.4}
              makeArea={false}
              xLabelSize={0}
              yLabelSize={0}
              currentPrice={currentPrices && currentPrices.filter(price => price.base === item.pair)[0].amount}
              currency={currency}
            />
            :
            <div
              style={{ height: svgWidth * .8 }}
              className="loaders-frames"
            ></div>
          }
        </div>
      )
    })
    if (!this.state.pairBoxMode) {
      currencyPairs = pairs.map((item, i) => {
        return (
          <div className="col-md-12 px-2 py-2"
            key={i}
            id={i}
            onDrop={this.onDropSwap.bind(this)}
            onDragOver={this.allowDrop.bind(this)}
            draggable="false"
          >
            {historyData && windowWidth ?
              <PairStripe
                id={i}
                dragStart={(e) => this.dragStart(e)}
                lineChartStripeRef={this.lineChartStripeRef}
                onClick={this.toggleChartModal.bind(this, historyData.filter(data => data.pair === item.pair))}
                title={item.name}
                short={item.pair}
                path={item.path}
                color={item.color}
                data={this.props.historyPrices.filter(data => data.pair === item.pair)}
                svgWidth={svgWidth - 32}
                svgHeight={svgWidth * 0.1}
                makeArea={false}
                xLabelSize={0}
                yLabelSize={0}
                currentPrice={currentPrices.filter(price => price.base === item.pair)[0].amount}
                currency={currency}
              />
              :
              <div
                className="pairStripe"
              ></div>
            }
          </div>
        )
      })
    }

    return (
      <div className="container-fluid p-0" style={styles.container} >
        <DashboardHeader />
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleChartModal.bind(this, null)}
          centered={true}
        >
          <ModalHeader toggle={this.toggleChartModal.bind(this, null)} style={{ background: '#eee' }}>
            <img src={pair ? `assets/${pair.path}` : null} alt=""
              style={{ width: 30, height: 30, marginRight: '1rem' }}
              className="d-inline"
            />
            <p style={{ fontSize: 24, color: '#666' }} className="d-inline">
              {pair ? pair.name : null}
            </p>
          </ModalHeader>
          <ModalBody id="modal-body" className="pt-5 pt-md-3">
            <div className="row justify-content-center align-items-center" >
              <div className="col-md-8 align-self-end" ref={this.lineChartModalRef} style={{ background: '#fff', borderRadius: 10 }}>
                {
                  historyData && pair && lineChartWidth ?
                    <div>
                      {hoverLoc ?
                        <ToolTip
                          hoverLoc={hoverLoc}
                          activePoint={activePoint}
                          marginTop={-45}
                          lineClass={"linechart-dashboard"}
                          currency={currency}
                        /> : null}
                      <LineChart
                        data={historyData.filter(price => price.pair === pair.pair)}
                        onChartHover={(a, b) => this.handleChartHover(a, b)}
                        svgWidth={lineChartWidth}
                        svgHeight={lineChartWidth * .6}
                        makeArea={true}
                        makeAxis={true}
                        makeLabels={true}
                        xLabelSize={30}
                        yLabelSize={windowWidth < 577 ? 50 : 90}
                        createLine={true}
                        makeActivePoint={true}
                        color="#007bff"
                        strokeWidth={windowWidth < 577 ? 2 : 3}
                        lineClass={"linechart-dashboard"}
                        currency={currency}
                        windowWidth={windowWidth}
                      />
                    </div>
                    : null
                }
              </div>
              <div className='col-md-4'>
                <div className="row justify-content-center mt-3 mt-md-0">
                  <ButtonGroup>
                    <Button style={styles.innerBtnGrp}
                      onClick={this.changePairRange.bind(this, 'USD')}
                    >
                      USD
										</Button>
                    <Button style={styles.innerBtnGrp}
                      onClick={this.changePairRange.bind(this, 'EUR')}
                    >
                      EUR
										</Button>
                    <Button style={styles.innerBtnGrp}
                      onClick={this.changePairRange.bind(this, 'GBP')}
                    >
                      GBP
										</Button>
                  </ButtonGroup>
                </div>
                {
                  !fetchingData && pair ?
                    <InfoBox
                      currentPrice={true}
                      monthChangeD={true}
                      monthChangeP={true}
                      currency={currency}
                      pair={pair}
                    />
                    : null
                }
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-md-start justify-content-center" >
            <ButtonGroup style={{ marginLeft: windowWidth >= 768 ? 200 : null }}>
              <Button style={styles.innerBtnGrp}
                onClick={this.changeChartRange.bind(this, 'Day')}
              >
                Day
										</Button>
              <Button style={styles.innerBtnGrp}
                onClick={this.changeChartRange.bind(this, 'Week')}
              >
                Week
										</Button>
              <Button style={styles.innerBtnGrp}
                onClick={this.changeChartRange.bind(this, 'Month')}
              >
                Month
										</Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
        <div className="container" style={{ maxWidth: 1040 }}>
          <div className="row pt-3 px-2 no-gutters">
            <div className="col-md-12 bg-white dashboard-topbar d-flex p-1 justify-content-between">
              <div className="col-7 col-md-4 d-flex  ml-md-auto mr-md-auto justify-content-md-end">
                <div className="dashboard-topbar-text  p-2 border-right"
                  onClick={this.changePairRange.bind(this, 'USD')}
                >
                  USD</div>
                <div className="dashboard-topbar-text  p-2 border-right"
                  onClick={this.changePairRange.bind(this, 'EUR')}
                >
                  EUR</div>
                <div className="dashboard-topbar-text p-2"
                  onClick={this.changePairRange.bind(this, 'GBP')}
                >
                  GBP
								</div>
              </div>
              <div className="col-4 col-md-2 text-right d-flex">
                <button className="btn btn-link pr-0 ml-md-auto"
                  onClick={windowWidth >= 600 ?
                    this.toggleViewModehandler.bind(this, false)
                    : null
                  }
                >
                  <MdMenu size={30} color="#aaa" strokeWidth="1" />
                </button>
                <button className="btn btn-link pl-1 pr-0"
                  onClick={this.toggleViewModehandler.bind(this, true)}
                >
                  <IoMdApps size={30} color="#aaa" />
                </button>
              </div>
            </div>
          </div>
          <div className="row no-gutters pt-1">
            {currencyPairs}
          </div>
        </div>

      </div >
    )
  }
}

const styles = {
  container: {
    height: '100%',
    backgroundColor: 'rgb(245,245,245)',
  },
  innerBtnGrp: {
    background: '#eee',
    color: '#666',
    border: '1px solid #ddd'
  },
  innerBtnGrpActive: {
    background: '#ddd',
    color: '#666',
    border: '1px solid #ddd'
  }
}

const mapStateToProps = (state) => ({
  sessionUser: state.auth.sessionUser,
  historyPrices: state.data.historyPrices,
  currentPrices: state.data.currentPrices,
  pairs: state.data.currencyPairs
})

const mapDispatchToProps = dispatch => ({
  getAllCurrenciesHistoryPrices: (currency) => dispatch(getAllCurrenciesHistoryPrices(currency)),
  onGetAllCurrenciesCurrentPrices: (currency) => dispatch(getAllCurrenciesCurrentPrices(currency)),
  onGetCurrencyPairs: () => dispatch(getCurrencyPairs()),
  changeListOrder: (old_idx, new_idx) => dispatch(changeListOrder(old_idx, new_idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
