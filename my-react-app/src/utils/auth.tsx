// export const getTokenFromStorage = () => localStorage.getItem('accessToken');

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true, // Important for sending cookies
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add access token to headers for each request
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle token expiration and refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await api.post('/auth/refreshToken');
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                localStorage.removeItem('accessToken');
                // Redirect to login page or handle as needed
                // Example: history.push('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
