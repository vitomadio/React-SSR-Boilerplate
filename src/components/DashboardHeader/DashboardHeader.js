import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import LogoSVG from '../SVGs/LogoSVG';
import { logoutUser, getSession } from '../../store/actions';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';
import './DashboardHeader.css';

class DashboardHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      windowWidth: null
    };
  }

  componentDidMount() {
    const windowWidth = window.innerWidth;
    this.setState({ windowWidth: windowWidth })

    //Check if session exists otherwise redirects to login page.
    if (!this.props.sessionUser) {
      this.props.getSession()
        .then(({ data }) => {
          if (data.success === false) {
            return this.props.history.push({ pathname: '/auth', state: { page: 'login' } });
          }
        })
        .catch(err => console.log(err));
    }
  }
  //LOGOUT ACTION.
  onLogoutHandler = () => {
    this.props.onLogout()
      .then(({ data }) => {
        if (data && data.success === true) {
          return this.props.history.push({ pathname: '/auth', state: { page: 'login' } })
        }
      })
      .catch(err => console.log(err));
  }
  //TOGGLES NAVBAR.
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const name = this.props.sessionUser ? this.props.sessionUser.name : null;
    const { windowWidth } = this.state;

    return (
      <Navbar expand="lg" className="shadow-sm px-0 px-md-2" dark={true} style={{ background: '#3252A0' }}>
        <div className="container" style={{ maxWidth: 1600 }}>
          <Link className="navbar-brand" to="/">
            <LogoSVG fillOne="white" width={windowWidth >= 768 ? 147.69 : 74} height={windowWidth >= 768 ? 40 : 20} />
          </Link>
          <NavbarToggler onClick={this.toggle} className="text-white" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link text-white mr-3 hello-btn"
                  to={{ pathname: '/auth', state: { page: 'register' } }}
                >
                  Hello {name}!
                  </Link>
              </NavItem>
              <NavItem >
                <div className="nav-link btn-link text-white logout-btn"
                  style={{ border: '1px solid #fff', cursor: 'pointer' }}
                  onClick={this.onLogoutHandler}
                >
                  Log out</div>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sessionUser: state.auth.sessionUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logoutUser()),
    getSession: () => dispatch(getSession())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardHeader));