import axios from 'axios';
import { ON_LOGIN_USER } from './actionTypes';
import { setMessage } from '../actions';

//Create account.
export const createAccount = (credentials) => {
    return dispatch => {
        axios({
            method: 'post',
            url: 'authentication/signup',
            data: credentials
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };
};

//Checks for user session.
export const getSession = () => {
    return dispatch => {
        return axios({
            method: 'get',
            url: 'authentication/account'
        })
            .then(({ data }) => {
                dispatch(setSessionUser(data.userData));
                return {
                    data: data
                }
            })
            .catch(err => console.log(err));
    };
};

//Login user.
export const login = (credentials) => {
    return dispatch => {
        return axios({
            method: 'post',
            url: 'authentication/login',
            data: credentials
        })
            .then(({ data }) => {
                if (data.success === true) {
                    dispatch(setSessionUser(data.user));
                    sessionStorage.setItem('uid', data.session.passport.user.id);
                } else {
                    dispatch(setMessage(data.message));
                }
            })
            .catch(err => console.log(err));
    };
};
//Sets session user to store.
const setSessionUser = (user) => {
    return {
        type: ON_LOGIN_USER,
        payload: user
    }
}

//Logout.
export const logoutUser = () => {
    return dispatch => {
        return axios({
            method: 'get',
            url: 'authentication/logout'
        })
    }
}

