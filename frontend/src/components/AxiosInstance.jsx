// src/components/Axiosinstance.js
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Add request interceptor to handle Authentication tokens
AxiosInstance.interceptors.request.use(
    async config => {
        // Add authentication token if it exists
        const token = localStorage.getItem('Token');
        const isAuthRoute = config.url.includes('login') || config.url.includes('register');
        
        if (token && !isAuthRoute) {
            config.headers['Authorization'] = `Token ${token}`;
            console.log('Request URL:', config.url);
            console.log('Added token to request:', token);
        } else if (isAuthRoute) {
            console.log('Skipping token for auth route:', config.url);
        } else {
            console.log('No token found in localStorage');
        }
        return config;
    },
    error => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
AxiosInstance.interceptors.response.use(
    response => {
        console.log('Response:', response.status, response.config.url);
        return response;
    },
    error => {
        if (error.response) {
            console.error('Response error:', error.response.status, error.response.data);
            console.error('Failed URL:', error.config.url);
            
            // Handle different error cases
            switch (error.response.status) {
                case 401:
                    // Only redirect on 401 if not trying to login/register
                    if (!error.config.url.includes('login') && 
                        !error.config.url.includes('register')) {
                        console.log('Unauthorized access, clearing token');
                        localStorage.removeItem('Token');
                        window.location.href = '/';
                    }
                    break;
                case 403:
                    console.error('Forbidden access');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('Request failed');
            }
        } else if (error.request) {
            // Network error or server not running
            console.error('Network error - no response received:', error.message);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;
