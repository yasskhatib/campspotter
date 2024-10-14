import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://campbackend-ubg6.onrender.com', //  https://campbackend-production.up.railway.app
});

export default axiosInstance;
