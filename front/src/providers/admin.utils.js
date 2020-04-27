import axios from 'axios';
import * as config from '../config';

export const getUsers = (token) => {
    return callProtectedApi(config.API_USERS, 'GET', token);
};

export const deleteUser = (id, token) => {
    return callProtectedApi(`${config.API_USERS}/${id}`, 'DELETE', token);
};

export const getRoles = (token) => {
    return callProtectedApi(`${config.API_ROLES}`, 'GET', token);
};

export const deleteRole = (username, roleCode, token) => {
    return callProtectedApi(`${config.API_ROLES}/delete`, 'POST', token, {}, {
        username: username,
        code: roleCode
    });
};

export const addRole = (username, roleCode, token) => {
    return callProtectedApi(`${config.API_ROLES}/add`, 'POST', token, {}, {
        username: username,
        code: roleCode
    });
};

const callProtectedApi = (servicePath, method, token, additionalHeaders = {}, body = {}) => {
    const options = {
        url: `${config.API_URI}${servicePath}`,
        method: method,
        data: body,
        headers: {
            Authorization: `Bearer ${token}`,
            ...additionalHeaders
         },
    };
    return axios(options);
}