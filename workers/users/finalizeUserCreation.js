import axios from 'axios';
import * as config from '../config';

const API_BASE_URL = config.API_URI;
const route = '/worker/users';

const finalizeUserCreation = async (data) => {
    console.log(`posting to : ${API_BASE_URL}${route}`)
    const result = await axios.post(`${API_BASE_URL}${route}`, data);
    return result;
};

export default finalizeUserCreation;