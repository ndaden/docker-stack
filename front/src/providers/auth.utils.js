import { useState, useEffect } from 'react';
import axios from 'axios';
import * as config from '../config';

export const isAuthenticated = () => {
    const jwt = localStorage.getItem('token');
    let options = {};
    if (jwt) {
        options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${jwt}` },
            url: `${config.API_URI}${config.API_AUTH}`,
        };
    } else {
        options = {
            method: 'GET',
            url: `${config.API_URI}${config.API_AUTH}`,
        };
    }
    return axios(options);
};

export const useAuthentication = () => {
    const [user, setuser] = useState({});

    useEffect(() => {
        async function getSession() {
            const result = await isAuthenticated();
            setuser(result.data);
        }
        getSession();
    }, []);

    if (user === undefined) {
        return { isAuthenticated: false };
    }
    return user;
};

export const handleLogin = values => axios.post(`${config.API_URI}${config.API_AUTH}`, values);

export const activateAccount = values => axios.post(`${config.API_URI}${config.API_ACTIVATE}`, values);

export const changePassword = (token, values) => {
    const options = {
        url: `${config.API_URI}${config.API_CHANGE_PASSWORD}`,
        method: 'POST',
        data: values,
        headers: {
            Authorization: `Bearer ${token}`,
         },
    };
    return axios(options);
};

export const uploadProfilePicture = (token, values) => {
    const options = {
        url: `${config.API_URI}${config.API_UPLOAD_PROFILE_PICTURE}`,
        method: 'POST',
        data: values,
        headers: {
            Authorization: `Bearer ${token}`,
         },
    };
    return axios(options);
};
