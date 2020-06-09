import axios from 'axios';
import * as config from '../../config';

const callProtectedApi = (servicePath, method, token = '', additionalHeaders = {}, body = {}) => {
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
};

export const getSite = async (name) => {
    return await callProtectedApi(`/cms/site/${name}`, 'GET');
};
