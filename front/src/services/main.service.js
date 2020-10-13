import axios from 'axios';
import * as config from '../config';

function callProtectedApi(servicePath, method, token, additionalHeaders = {}, body = {}) {
    const options = {
        url: `${config.API_URI}${servicePath}`,
        method,
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
            ...additionalHeaders,
        },
    };
    return axios(options);
}

async function isAuthenticated() {
    const result = await callProtectedApi(config.API_AUTH, 'GET', localStorage.getItem('token'));
    return result.data;
}

async function authenticate(data) {
    const { username, password } = data;
    const result = await callProtectedApi(config.API_AUTH, 'POST', undefined, undefined, { username, password });
    return result.data;
}

async function createAccount(data) {
    const { username, email, password } = data;
    try {
        const result = await callProtectedApi(config.API_USERS, 'POST', undefined, undefined, { username, email, password });
        return result.data;
    } catch (e) {
        return e.response.data;
    }
}

async function changeProfilePicture(data) {
    try {
        const result = await callProtectedApi(config.API_UPLOAD_PROFILE_PICTURE, 'POST', localStorage.getItem('token'), undefined, data);
        return result.data;
    } catch (e) {
        return e.response.data;
    }
}

async function activateAccount(data) {
    try {
        const result = await callProtectedApi(config.API_ACTIVATE, 'POST', localStorage.getItem('token'), undefined, data);
        return result.data;
    } catch (e) {
        return e.response.data;
    }
}

async function changePassword(data) {
    try {
        const result = await callProtectedApi(config.API_CHANGE_PASSWORD, 'POST', localStorage.getItem('token'), undefined, data);
        return result.data;
    } catch (e) {
        return e.response.data;
    }
}

export {
    isAuthenticated,
    authenticate,
    createAccount,
    changeProfilePicture,
    activateAccount,
    changePassword,
};
