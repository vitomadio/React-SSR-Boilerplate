import React from "react";
import './RegisterHeader.css';
import { Link } from "react-router-dom";
import LogoSVG from '../SVGs/LogoSVG';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

class RegisterHeader extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    };

  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar expand="md" className="bg-transparent px-0" dark={true} style={{ height: 62 }}>
        <div className="container" style={{ maxWidth: 1600 }}>
          <Link className="navbar-brand register" to="/">
            <LogoSVG fillOne="#fff" width={147.69} height={40} />
          </Link>
          <NavbarToggler onClick={this.toggle} className="text-white" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="mr-lg-3 register">
                <Link className="nav-link text-white hello-btn "
                  to={{ pathname: '/auth', state: { page: 'register' } }}
                  onClick={this.props.changeView('register')}
                >
                  Register</Link>
              </NavItem>
              <NavItem className="mr-lg-3 register">
                <Link className="nav-link btn-link text-white logout-btn "
                  to={{ pathname: '/auth', state: { page: 'login' } }}
                  onClick={this.props.changeView('login')}
                >
                  Log In</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }

};

export default RegisterHeader;
