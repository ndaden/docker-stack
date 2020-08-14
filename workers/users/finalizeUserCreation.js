import axios from 'axios';

const API_BASE_URL = 'http://api:3000';
const route = '/worker/users';

const finalizeUserCreation = async (data) => {
    console.log(`posting to : ${API_BASE_URL}${route}`)
    const result = await axios.post(`${API_BASE_URL}${route}`, data);
    return result;
};

export default finalizeUserCreation;