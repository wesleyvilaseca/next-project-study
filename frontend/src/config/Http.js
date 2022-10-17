import Axios from 'axios';
import { apiUrl, rootUrl } from './App';

export const Http = Axios.create({
    baseURL: apiUrl
})