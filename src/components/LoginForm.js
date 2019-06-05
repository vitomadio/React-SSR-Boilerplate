import React from 'react';
import { Link } from 'react-router-dom';

const Login = React.forwardRef((props, ref) => (

    <div className="col-12 col-md-8 col-lg-6 col-xl-5" ref={ref} style={{ maxWidth: 470 }}>
        <h2 className="text-white text-center mb-4">Log in to your account.</h2>
        <div className="card p-4 shadow-sm" style={{ borderRadius: 10 }} >
            <form className="form-group">
                <div className="input-group-lg">
                    <input type="email" className="form-control mb-3 rounded-0" placeholder="Email"
                        style={props.state.email.valid === false ? styles.disabled : null}
                        onChange={props.onChange.bind(this, 'email')}
                    />
                </div>
                <div className="input-group-lg">
                    <input type="password" className="form-control mb-3 rounded-0" placeholder="Password"
                        style={props.state.password.valid === false ? styles.disabled : null}
                        onChange={props.onChange.bind(this, 'password')}
                    />
                </div>
                <div className="row justify-content-between align-content-center">
                    <div className="col-auto">
                        <div className="custom-control custom-checkbox mt-2">
                            <input type="checkbox" className="custom-control-input self-align-end" id="customCheck1"
                                onChange={props.onCheck}
                            />
                            <label className="custom-control-label self-align-end" htmlFor="customCheck1">Keep me signed in on this computer</label>
                        </div>
                    </div>
                    <div className="col-auto float-right">
                        <div className="btn btn-primary btn-lg rounded-0"
                            style={
                                props.state.email.valid === false ||
                                    props.state.password.valid === false ?
                                    styles.btnDisabled : null
                            }
                            onClick={
                                props.state.email.valid === true &&
                                    props.state.password.valid === true ?
                                    props.onSignIn : null
                            }
                        >
                            Log In</div>
                    </div>
                </div>
            </form>
        </div>
        <div className="row justify-content-center">
            <div className="ml-2 mt-2 col-auto">
                <Link className="text-white mr-4" to="">
                    Forgot your password?
                </Link>
            </div>
            <div className="btn btn-link text-white mr-4 col-auto"
                onClick={props.changeView('register')}
            >
                Don't have an account?
            </div>

        </div>
        <div className="text-center">
            <Link className="text-white mr-4" to="">
                Privacy Policy
                    </Link>
        </div>
    </div >
)
);

const styles = {
    disabled: {
        backgroundColor: '#FADBD8'
    },
    btnDisabled: {
        backgroundColor: '#7FBBFF',
        borderColor: '#7FBBFF'
    }
}

export default Login;




