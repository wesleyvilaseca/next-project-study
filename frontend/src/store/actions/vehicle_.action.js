import { HttpAuth, HttpAuthUpload } from "../../config/Http";
import { changeLoading } from "./loading.action";
import { changeNotify } from "./notify.action";

export const actionTypes = {
    INDEX: 'VEHICLE_INDEX',
    SUCCESS: 'VEHICLE_SUCCESS',
    ERROR: 'VEHICLE_ERROR',
}


export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const errors = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const index_ = (payload, isLoadMore) => ({
    type: actionTypes.INDEX,
    payload,
    isLoadMore
})


export const index = (query, isLoadMore) => dispatch => {
    const endpoint = '/api/vehicles';
    return HttpAuth.get(`${endpoint}?${new URLSearchParams(query)}`)
        .then(res => {
            // console.log(res.data.vehicles)
            dispatch(index_(res.data, isLoadMore))
            return res;
        })
        .catch(error => {
            console.log("error", error)
        })
}