import React, { Component } from 'react'
import RegisterHeader from '../components/RegisterHeader/RegisterHeader';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { withRouter } from 'react-router-dom';
import validate from '../utils/validations';
import { connect } from 'react-redux';
import { createAccount, login } from '../store/actions';

const ref = React.createRef();

class Auth extends Component {

  constructor(props) {
    super(props)
    this.state = {
      marginTop: null,
      page: null,
      remember: false,
      message: null,
      credentials: {
        name: {
          value: "",
          touched: false,
          valid: false,
          validationRules: {
            notEmpty: true
          }
        },
        lastName: {
          value: "",
          touched: false,
          valid: false,
          validationRules: {
            notEmpty: true
          }
        },
        email: {
          value: "",
          touched: false,
          valid: false,
          validationRules: {
            isEmail: true
          }
        },
        password: {
          value: "",
          touched: false,
          valid: false,
          validationRules: {
            minLength: 6
          }
        },
        confirm: {
          value: "",
          touched: false,
          valid: false,
          validationRules: {
            equalTo: "password"
          }
        },
      }
    }

  }

  componentDidMount() {
    const page = this.props.location.state.page;
    this.setState({ page: page }, () => {
      this.onChangeMarginTop();
    });
  }

  //Checks if login and signup componenets have changed.
  onChangeView(page) {
    if (this.state.page !== page) {
      this.setState({ page: page }, () => {
        this.onChangeMarginTop();
      })
    }
  }

  //Keep me signed in checkbox changed.
  onCheckHandler = () => {
    this.setState({ remember: true })
  }

  //Handles input text.
  onChangeInputText = (key, e) => {
    const value = e.target.value;
    let connectedValue = {};
    if (this.state.credentials[key].validationRules.equalTo) {
      const equalControl = this.state.credentials[key].validationRules.equalTo;
      const equalValue = this.state.credentials[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        credentials: {
          ...prevState.credentials,
          confirm: {
            ...prevState.credentials.confirm,
            valid:
              key === "password"
                ? validate(
                  prevState.credentials.confirm.value,
                  prevState.credentials.confirm.validationRules,
                  connectedValue
                )
                :
                prevState.credentials.confirm.valid
          },
          [key]: {
            ...prevState.credentials[key],
            value: value,
            valid: validate(
              value,
              prevState.credentials[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      }
    });
  };

  //Create a new account.
  onCreateAccountHandler = () => {
    const credentials = {
      name: this.state.credentials.name.value,
      lastName: this.state.credentials.lastName.value,
      email: this.state.credentials.email.value,
      password: this.state.credentials.password.value,
    }
    console.log(credentials);
    this.props.createAccount(credentials)
  }
  //Logs in user.
  onSigninUserHandler = () => {
    const credentials = {
      email: this.state.credentials.email.value,
      password: this.state.credentials.password.value,
      remember: this.state.remember
    }
    this.props.login(credentials)
      .then(() => {
        if (this.props.sessionUser) {
          return this.props.history.push('/dashboard');
        }
        this.setState({ message: this.props.message })
      });
  }
  //Changes the margin according to the component.
  onChangeMarginTop() {
    const elHeight = ref.current.offsetHeight;
    const winHeight = window.innerHeight;
    const marginTop = (winHeight - elHeight) / 2;
    this.setState({ marginTop: marginTop });
  }

  render() {

    const { page } = this.state || this.props; //Indicates the tipe of page to render.
    const { message } = this.state;

    return (
      <div className="container-fluid header-background p-0" style={styles.container}>
        <RegisterHeader
          changeView={(page) => this.onChangeView.bind(this, page)}
        />
        <div className="container">
          <div className="row justify-content-center" style={{ marginTop: this.state.marginTop }}>
            {message &&
              <div className="col-12">
                <div className="col-4 alert alert-danger text-center mr-auto ml-auto">
                  {message}
                </div>
              </div>
            }
            {page === 'login' ?
              <LoginForm
                ref={ref}
                onChange={((key, e) => this.onChangeInputText(key, e))}
                onCheck={this.onCheckHandler}
                onSignIn={this.onSigninUserHandler}
                state={this.state.credentials}
                changeView={(page) => this.onChangeView.bind(this, page)}
              />
              :
              <SignupForm
                ref={ref}
                onChange={((key, e) => this.onChangeInputText(key, e))}
                onCreateAccount={this.onCreateAccountHandler}
                state={this.state.credentials}
                changeView={(page) => this.onChangeView.bind(this, page)}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    height: '100%'
  },
}

const mapStateToProps = state => {
  return {
    page: state.navigation.route,
    sessionUser: state.auth.sessionUser,
    message: state.ui.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAccount: (credentials) => dispatch(createAccount(credentials)),
    login: (credentials) => dispatch(login(credentials)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
