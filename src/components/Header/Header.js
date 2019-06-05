import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { onChangeRoute, getSession, getAllPrices } from '../../store/actions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';
import './Header.css';
import pairs from '../../currencyPairs';
import { IoIosLogIn } from 'react-icons/io';

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      dropdownOpen: false,
      dropDownTitle: "BTC/USD",
      dropDownTitleCurrency: "USD",
      pair: "BTC",
      dropdownWidth: null,
      marginLeft: null,
      isOpen: false,
      isOpenSecond: false,
      showMobileToggle: false
    };
  }

  componentDidMount() {
    this.props.getSession(); //Calls getSession action.
    this.props.getAllPrices(); //Calls getAllPrices action.
    window.addEventListener('resize', this.handleResize); //Add event listener to hear resize page.

    const windowWidth = window.innerWidth;
    const dropdownToggle = window.document.getElementById('dropdown-toggle').getBoundingClientRect();
    if (windowWidth >= 1250) {
      const overFlow = (dropdownToggle.left + 1250) - windowWidth;
      this.setState({
        dropdownWidth: 1250,
        marginLeft: overFlow + ((dropdownToggle.left - overFlow) / 2)
      });
    } else {
      this.setState({
        dropdownWidth: windowWidth,
        marginLeft: dropdownToggle.left
      });
    }

    if (windowWidth <= 576) {
      this.setState({ showMobileToggle: true });
    }
  }
  //SETS AUTH PAGE TYPE TO STORE.
  navigateToAuthHandler(page, e) {
    this.props.onChangeRoute(page);
  }
  //NAVIGATES TO CONTACT SMOOTHLY
  navigateToContact = () => {
    window.document.getElementById('contact').scrollIntoView({
      behavior: 'smooth'
    })
  }
  //OPENS CLOSE DROPDOWN BUTTON.
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  //TOGGLES MAIN NAVBAR.
  navbarToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  //TOGGLES THE SOCOND NAVBAR.
  secondNavbarToggle = () => {
    this.setState({
      isOpenSecond: !this.state.isOpenSecond
    });
  }
  //CHANGE CURRENCY PAIR IN HEADER DROPDOWN BUTTON.
  changeCurrencyPairHandler = (crypto, currency, e) => {
    e.preventDefault();
    this.setState({
      dropDownTitle: `${crypto}/${currency}`,
      pair: crypto,
      dropDownTitleCurrency: currency
    })
  }
  //CHECKS IF PAGE WIDTH AHVE CHANGED IN ORDER TO SHOW OR HIDE SECOND NAVBAR TOGGLER.
  handleResize = (event) => {
    const windowWidth = window.innerWidth; //Defining window width.
    //Shows or hide second nav toggler depending on window width.
    if (windowWidth <= 576) {
      this.setState({ showMobileToggle: true })
    } else {
      this.setState({ showMobileToggle: false })
    }
    //Sets dropdown menu width depending on window width.
    const dropdownToggle = window.document.getElementById('dropdown-toggle').getBoundingClientRect();
    if (windowWidth >= 1250) {
      const overFlow = (dropdownToggle.left + 1250) - windowWidth;
      this.setState({
        dropdownWidth: 1250,
        marginLeft: overFlow + ((dropdownToggle.left - overFlow) / 2)
      });
    } else {
      this.setState({
        dropdownWidth: windowWidth,
        marginLeft: dropdownToggle.left
      });
    }
  }

  render() {
    const { dropDownTitle, dropDownTitleCurrency, pair, dropdownOpen, isOpenSecond } = this.state;
    const currentPrice = this.props.prices && this.props.prices.filter(price => price.base === pair && price.currency === dropDownTitleCurrency)[0];
    const prices = this.props.prices;

    return (
      <div >
        <Navbar expand="md" color="light" dark={false} style={{ height: 62, zIndex: 999 }} className="home-navbar">
          <div className="container" style={{ maxWidth: 1400 }}>
            <NavbarBrand href="/" className="home-nav-brand">
              <img src="/assets/Logo.png" alt="Crypto-charts Logo" className="home-nav-logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.navbarToggle} className="home-nav-toggler" style={{ color: 'rgba(32, 51, 97, 1)' }} />

            <Collapse isOpen={this.state.isOpen} navbar className="home-nav-collapse">
              <Nav className="ml-auto" navbar>
                <NavItem className="nav-item mr-3 home-nav-item">
                  <NavLink className="nav-link home-nav-link" href="/">Home</NavLink>
                </NavItem>
                <NavItem className="nav-item mr-3 home-nav-item">
                  <Link className="nav-link home-nav-link" to="/dashboard">Account</Link>
                </NavItem>
                <NavItem className="nav-item mr-3 home-nav-item">
                  <NavLink className="nav-link home-nav-link" href="/">Our Services</NavLink>
                </NavItem>
                <NavItem className="nav-item home-nav-item">
                  <NavLink className="nav-link home-nav-link" href="#"
                    onClick={this.navigateToContact}
                  >
                    Contact
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Navbar expand="md" className="align-items-center p-0" style={{ height: 46, zIndex: 800, background: '#333433' }}>
          <div className="container" style={{ height: '100%', maxWidth: 1400 }}>

            <Nav className="ml-lg-auto mr-lg-auto" style={{ height: '100%', alignItems: 'center', marginTop: -1 }}>
              <UncontrolledDropdown
                direction="down"
                isOpen={dropdownOpen}
                toggle={this.toggle}
                style={{ height: '100%' }}
              >
                <DropdownToggle className="nav-link btn btn-link d-flex align-items-center home-nav-dropdown-toggle" id="dropdown-toggle"
                  style={{
                    background: dropdownOpen ? '#42474A' : 'transparent'
                    , border: 'none', borderRadius: 0, height: '100%'
                  }}
                >
                  <div className="dropdown-toggle d-inline mr-2">
                    {dropDownTitle}
                  </div>
                  <div className=" text-white d-inline flex-grow-1">{currentPrice && parseFloat(currentPrice.amount).toLocaleString('us-EN', { style: 'currency', currency: dropDownTitleCurrency, minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                  </div>
                </DropdownToggle>
                <DropdownMenu
                  className="row"
                  persist={true}
                  cssModule={{ background: '#42474a' }}
                  style={{ width: this.state.dropdownWidth, left: - this.state.marginLeft }} id="dropdown-menu d-flex row justify-content-start">
                  {pairs.map((c_pair, i) => (
                    <DropdownItem key={i} toggle={false} className="py-2 px-1 mx-auto mx-md-0 col-auto">
                      <div className="px-2">
                        <div className="dropdown-item-text col-auto" style={{ fontSize: 11 }}>{c_pair.name}
                        </div>
                        {prices &&
                          prices.map((price, x) => {
                            if (price.base === c_pair.pair) {
                              return (
                                <div key={x} className="d-flex dropdown-item-wrapper"
                                  onClick={this.changeCurrencyPairHandler.bind(this, price.base, price.currency)}
                                >
                                  <div className="dropdown-item-pairs d-inline"
                                    style={{
                                      color: price.currency === dropDownTitleCurrency &&
                                        price.base === pair ? "#fff" : "#64AFFF"
                                    }}
                                  >
                                    {price.base + '/' + price.currency}
                                  </div>
                                  <div className="dropdown-item-price col-auto">
                                    {parseFloat(price.amount).toLocaleString('us-EN', { style: 'currency', currency: price.currency, minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                                  </div>
                                </div>
                              )
                            }
                          })
                        }
                      </div>
                    </DropdownItem>
                  ))
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {this.state.showMobileToggle ?
              <Nav className="ml-auto register-nav-mobile" style={{ height: '100%', marginTop: -1 }}>
                <UncontrolledDropdown
                  nav inNavbar
                  isOpen={isOpenSecond}
                  toggle={this.secondNavbarToggle}
                  direction="down"
                >
                  <DropdownToggle
                    className="register-dropdown-toggle"
                    style={{ background: isOpenSecond ? '#42474A' : 'transparent', borderWidth: 0, height: '100%' }}
                  >
                    <IoIosLogIn size={30} color="#ddd" />
                  </DropdownToggle>
                  <DropdownMenu className="secondDropdown flex-column" style={{ minWidth: 'auto' }}>
                    {/* <DropdownItem className="p-0 text-right"> */}
                    <Link className="nav-link register-link"
                      to={{ pathname: '/auth', state: { page: 'register' } }}
                      onClick={this.navigateToAuthHandler.bind(this, 'register')}
                    >
                      Register</Link>
                    {/* </DropdownItem> */}
                    {/* <DropdownItem className="p-0 text-right"> */}
                    <Link className="nav-link register-link"
                      to={{ pathname: '/auth', state: { page: 'login' } }}
                      onClick={this.navigateToAuthHandler.bind(this, 'login')}
                    >
                      Log In</Link>
                    {/* </DropdownItem> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              :
              <Nav className="ml-auto register-nav">
                <li className=" mr-3">
                  <Link className="nav-link"
                    to={{ pathname: '/auth', state: { page: 'register' } }}
                    onClick={this.navigateToAuthHandler.bind(this, 'register')}
                  >
                    Register</Link>
                </li>
                <li className=" mr-3">
                  <Link className="nav-link"
                    to={{ pathname: '/auth', state: { page: 'login' } }}
                    onClick={this.navigateToAuthHandler.bind(this, 'login')}
                  >
                    Log In</Link>
                </li>
              </Nav>
            }
          </div>
        </Navbar>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    currentPrices: state.data.currentPrices,
    prices: state.data.prices
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeRoute: () => dispatch(onChangeRoute()),
    getSession: () => dispatch(getSession()),
    getAllPrices: () => dispatch(getAllPrices())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
