import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://campbackend-production.up.railway.app', // http://localhost:5000
});

export default axiosInstance;
