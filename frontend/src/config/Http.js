import Axios from 'axios';
import { apiUrl, rootUrl } from './App';

export const Http = Axios.create({
    baseURL: apiUrl
})

export const HttpAuth = Axios.create({
    baseURL: apiUrl,
})

// export const Http = Axios.create({
//     baseURL: apiUrl
// })

export const HttpAuthUpload = Axios.create({
    baseURL: apiUrl,
})

HttpAuthUpload.interceptors.request.use(
    async (config) => {
        config.headers.authorization = `Bearer ${await localStorage.getItem('access_token')}`
        config.headers.accept = 'application/json'
        config.headers['Content-Type'] = 'multipart/form-data'
        return config;
    }
)

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