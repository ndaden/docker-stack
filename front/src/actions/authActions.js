import axios from 'axios';
import * as Constants from './constants';
import * as config from '../config';


const startLogin = () => ({
    type: Constants.START_LOGIN,
});

const loginSuccess = result => ({
    type: Constants.LOGIN_OK,
    result,
});

const loginFailure = result => ({
    type: Constants.LOGIN_KO,
    result,
});

const login = values => (
    (dispatch) => {
    dispatch(startLogin());
    axios.post(`${config.API_URI}${config.API_AUTH}`, values)
        .then(response => dispatch(loginSuccess(response)), error => dispatch(loginFailure(error)));
    }
);

export {
    login,
};
