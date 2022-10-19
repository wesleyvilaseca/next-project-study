import Axios from 'axios';
import { apiUrl, rootUrl } from './App';

export const Http = (options) => Axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        ...options.headers
    }
})

export const HttpAuth = Axios.create({
    baseURL: apiUrl,
})

HttpAuth.interceptors.request.use(
    async (config) => {
        config.headers.authorization = `Bearer ${await localStorage.getItem('access_token')}`
        config.headers.accept = 'application/json'
        return config;
    }
)

HttpAuth.interceptors.request.use(response => {
    return response
}, error => {
    if (error.response) {
        //401 is not authorized
        if (error.response.status === 401) {
            localStorage.getItem('access_token');
            window.location.replace('login')
        }
    }
})