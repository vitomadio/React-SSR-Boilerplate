import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCurrenciesHistoryPrices,
  getAllCurrenciesCurrentPrices,
  getCurrencyPairs
} from "../store/actions";
import HomeTable from "../components/HomeTable/HomeTable";
import HomeFooter from "../components/HomeFooter/HomeFooter";
import Header from "../components/Header/Header";

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      historyData: null,
      currentPrices: [],
      fetchingData: true,
      currency: "USD"
    }
  };

  componentDidMount() {
    //Gets currency pairs list.
    this.props.onGetCurrencyPairs();
    //Gets current prices.
    this.getAllcurrentPrices();
    //Gets all historic pices.
    this.getAllHistoryPrices();
    //Adding onscroll event to window.
    window.addEventListener('scroll', this.handleScroll);
  }
  //CLEAR INTERVAL BEFORE UNMOUNT.
  componentWillUnmount() {
    clearInterval(this.refresh);
    window.removeEventListener('scroll', this.handleScroll);
  }
  //GET CURRENT PRICES.
  getAllcurrentPrices = () => {
    this.getData = () => { //Get current price info.
      this.props.onGetAllCurrenciesCurrentPrices(this.state.currency)
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  //GET ALL HISTORIC PICES.
  getAllHistoryPrices = () => {
    this.props.getAllCurrenciesHistoryPrices(this.state.currency)
  }
  //TRIGGERS LAPTOP SLIDE IN WHEN SCROLL REACHES ITS POSITION.
  handleScroll = (event) => {
    const el = window.document.getElementById('macbook');
    // const macbookHeight = macbook.clientHeight; No needed this time.
    const windowHeight = window.innerHeight;
    let scrollY = window.scrollY || window.pageYOffset;
    let scrollPosition = scrollY + windowHeight;
    let macbookPosition = macbook.getBoundingClientRect().top + scrollY;

    if (scrollPosition > macbookPosition) {
      el.classList.add("macbook-image");
    }
    window.document.getElementById('iphone').classList.add("iphone-image");
  }

  render() {
    const historyPrices = this.props.historyPrices;
    const currentPrices = this.props.currentPrices;
    return (
      <div style={{ height: '100%' }}>
        <Header />
        <div style={{ height: '100%' }}>
          <div className="container-fluid header-background p-0" style={styles.container}>
            <div className="container-home" style={styles.containerInner}>
              <div className="row align-items-center align-items-xl-start mr-0 justify-content-center" style={{ height: '100%' }}>
                <div className="col-1 col-xl-2 "></div>
                <div className="col-10 col-md-4 col-lg-5 col-xl-4 header-text-wrapper pl-1 pl-md-0" style={{ zIndex: 6 }}>
                  <div className="row justify-content-center">
                    <h1 className="text-light text-center text-md-left header-title">The best way to follow
                Cryptos market trends.</h1>
                    <p className="text-light text-center text-md-left header-text">Stay up to date with all information you need
                to invest on crypto-currencies market.</p>
                    <Link className="btn btn-outline-light btn-lg  get-started-btn"
                      to={{ pathname: "/auth", state: { page: 'register' } }}>
                      Get Started
                    </Link>
                  </div>
                </div>
                <div className="d-none d-md-flex col-md-auto col-lg-auto"></div>
                <div className="col-8 col-md-5 col-lg-5 col-xl-5 text-xl-right header-image-wrapper" style={{ position: 'relative', height: '100%' }}>
                  <img src="/assets/bitcoin-images.png" className="bitcoin-image" />
                  <img src="/assets/ether-images.png" className="ether-image" />
                  <img src="/assets/lite_images.png" className="lite-image" />
                  <img src="/assets/ripple_images.png" className="ripple-image" />
                  <img src="/assets/isometric_image.png" className="isometric" style={styles.img} />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid p-0">
            <div className="container pb-5 table-wrapper">
              <div className="row justify-content-center justify-content-xl-start">
                <div className="col-12 col-lg-7 col-xl-8">
                  <HomeTable
                    data={historyPrices}
                    pairs={this.props.pairs}
                    currentPrices={currentPrices}
                    currency={this.state.currency}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <img src="assets/iphone_mockup.png" alt="iphone-mockup-picture" id="iphone" />
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid services-background">
            <div className="container py-5">
              <div className="col-12 col-xl-8">
                <div className="row justify-content-center services" style={{ position: 'relative' }}>
                  <div className="col-12 col-md-4 mb-4 mb-md-0 text-center mt-lg-5 mt-xl-0">
                    <img src="assets/pc_svg.svg" alt="" className="services-svg mb-4" />
                    <h4 className="services-title mb-2">Check Your Stats</h4>
                    <p className="services-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu elit massa. Pellentesque vel leo non justo iaculis blandit a vitae ipsum. Nam eu volutpat ligula. Integer ac convallis mauris, commodo ullamcorper lacus.</p>
                  </div>
                  <div className="col-12 col-md-4 mb-4 mb-md-0 text-center">
                    <img src="assets/CELL_PHONE.svg" alt="" className="services-svg mb-4" />
                    <h4 className="services-title mb-2">Recive Notifications</h4>
                    <p className="services-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu elit massa. Pellentesque vel leo non justo iaculis blandit a vitae ipsum. Nam eu volutpat ligula. Integer ac convallis mauris, commodo ullamcorper lacus. Aenean consequat aliquam condimentum. </p>
                  </div>
                  <div className="col-12 col-md-4 text-center">
                    <img src="assets/PERSON.svg" alt="" className="services-svg mb-4" />
                    <h4 className="services-title mb-2">Consult Our Specialists</h4>
                    <p className="services-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu elit massa. Pellentesque vel leo non justo iaculis blandit a vitae ipsum. Nam eu volutpat ligula. Integer ac convallis mauris, commodo ullamcorper lacus. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="container py-3 py-lg-5 macbook-wrapper">
            <div className="row justify-content-center justify-content-xl-start">
              <div className="col-12">
                <img src="assets/macbook.png" alt="iphone-mockup-picture" id="macbook" style={styles.macBookImg} />
                <div className="text-macbook">
                  <h3 className="macbook-title">Who are we?</h3>
                  <p className="macbook-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu elit massa. Pellentesque vel leo non justo iaculis blandit a vitae ipsum. Nam eu volutpat ligula. Integer ac convallis mauris, commodo ullamcorper lacus. Aenean consequat aliquam condimentum.</p>
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="container-fluid py-3" style={{ background: '#171A1B' }}>
            <div className="container pt-4 pb-3  pb-md-5 footer-widget-wrapper">
              <div className="row justify-content-center">
                <div className="col-6 col-md-4 text-center">
                  <p className="title home-footer-widget-text">Products</p>
                  <p className="home-footer-widget-text">Mobile App</p>
                  <p className="home-footer-widget-text">Tradeview</p>
                </div>
                <div className="col-6 col-md-4 text-center">
                  <p className="title home-footer-widget-text">Services</p>
                  <p className="home-footer-widget-text">Partners</p>
                  <p className="home-footer-widget-text">Pro Traders</p>
                </div>
                <div className="col-6  col-md-4 text-center">
                  <p className="title home-footer-widget-text">Contact</p>
                  <p className="home-footer-widget-text">34th. Av. NW New York, 3000.</p>
                  <p className="home-footer-widget-text">info@criptochart.com</p>
                  <p className="home-footer-widget-text">+39 400556677</p>
                </div>
              </div>
            </div>
          </section>
          <HomeFooter />
        </div>

      </div>
    );
  }
};

const styles = {
  container: {
    height: 500
  },
  containerInner: {
    height: '100%',
  }
};

const mapStateToProps = (state) => {
  return {
    historyPrices: state.data.historyPrices,
    currentPrices: state.data.currentPrices,
    pairs: state.data.currencyPairs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCurrenciesHistoryPrices: (currency) => dispatch(getAllCurrenciesHistoryPrices(currency)),
    onGetAllCurrenciesCurrentPrices: (currency) => dispatch(getAllCurrenciesCurrentPrices(currency)),
    onGetCurrencyPairs: () => dispatch(getCurrencyPairs()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
