import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001', //  https://campbackend-production.up.railway.app
});

export default axiosInstance;
