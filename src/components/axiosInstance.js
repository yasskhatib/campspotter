import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://campbackend-production.up.railway.app', //  https://campbackend-production.up.railway.app
});

export default axiosInstance;
