import { HttpAuth } from "../../config/Http";
import { changeLoading } from "./loading.action";
import { changeNotify } from "./notify.action";

export const actionTypes = {
    INDEX: 'VEHICLE_INDEX',
    SHOW: 'VEHICLE_SHOW',
    UPDATE: 'VEHICLE_UPDATE',
    DESTROY: 'VEHICLE_DESTROY',
    CHANGE: 'VEHICLE_CHANGE',
    SUCCESS: 'VEHICLE_SUCCESS',
    ERROR: 'VEHICLE_ERROR',
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const errors = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const indexResponse = (payload, isLoadMore) => ({
    type: actionTypes.INDEX,
    payload,
    isLoadMore
})

export const index = (query, isLoadMore) => dispatch => {
    const endpoint = '/api/vehicles';
    return HttpAuth.get(`${endpoint}?${new URLSearchParams(query)}`)
        .then(res => {
            dispatch(indexResponse(res.data, isLoadMore))
        })
        .catch(error => {
            console.log("error", error)
        })
}

export const store = () => dispatch => {
    const endpoint = '/api/vehicles';
    return HttpAuth.post(endpoint)
        .then(res => {
            dispatch(indexResponse(res.data))
        })
        .catch(error => {
            console.log("error", error)
        })
}

export const show = (id) => dispatch => {
    const endpoint = '/api/vehicles';
    return HttpAuth.post(`${endpoint}/${id}`)
        .then(res => {
            dispatch(indexResponse(res.data))
        })
        .catch(error => {
            console.log("error", error)
        })
}

export const update = (data) => dispatch => {
    dispatch(changeLoading({ open: true }));
    const endpoint = '/api/vehicles';
    return HttpAuth.put(`${endpoint}/${data.id}`, data)
        .then(res => {
            dispatch(changeLoading({ open: false }));
            dispatch(success(true))
        })
        .catch(error => {
            dispatch(changeLoading({ open: false }));
            dispatch(success(false));
            console.log("error", error)
        })
}

export const destroyResponse = (payload) => ({
    typeof: actionTypes.DESTROY,
    payload
})

export const destroy = (id) => dispatch => {
    // dispatch(changeLoading({ open: true }));
    const endpoint = '/api/vehicles';
    return HttpAuth.delete(`${endpoint}/${id}`)
        .then(res => {
            // dispatch(changeLoading({ open: false }));
            dispatch(destroyResponse(id));
            // dispatch(success(true));
        })
        .catch(error => {
            // dispatch(changeLoading({ open: false }));
            dispatch(success(false));
            console.log("error", error);
        })
}

export const brand = (vehicle_type) => dispatch => {
    dispatch(changeLoading({ open: true }));
    const endpoint = '/api/vehicles';
    return HttpAuth.get(`${endpoint}/${vehicle_type}/brand`)
        .then(res => {
            dispatch(changeLoading({ open: false }));
            dispatch(indexResponse(res.data));
            return res;
        })
        .catch(error => {
            dispatch(changeLoading({ open: false }));
            dispatch(success(false));
            console.log("error", error);
        })
}

export const model = (vehicle_type, vehicle_brand) => dispatch => {
    dispatch(changeLoading({ open: true }));
    const endpoint = '/api/vehicles';
    return HttpAuth.get(`${endpoint}/${vehicle_type}/${vehicle_brand}/model`)
        .then(res => {
            dispatch(changeLoading({ open: false }));
            dispatch(indexResponse(res.data));
            return res;
        })
        .catch(error => {
            dispatch(changeLoading({ open: false }));
            dispatch(success(false));
            console.log("error", error);
        })
}

export const version = (vehicle_brand, vehicle_model) => dispatch => {
    dispatch(changeLoading({ open: true }));
    const endpoint = '/api/vehicles';
    return HttpAuth.get(`${endpoint}/${vehicle_brand}/${vehicle_model}/version`)
        .then(res => {
            dispatch(changeLoading({ open: false }));
            dispatch(indexResponse(res.data));
            return res;
        })
        .catch(error => {
            dispatch(changeLoading({ open: false }));
            dispatch(success(false));
            console.log("error", error);
        })
}

export const get_cep = (zipCode) => dispatch => {
    // dispatch(changeLoading({ open: true }));
    const endpoint = '/api/webservice/cep';
    const body = { cep: zipCode };
    return HttpAuth.post(`${endpoint}`, body)
        .then(res => {
            dispatch(change(res.data))
            dispatch(success(true));
            return res;
        })
        .catch(error => {
            // dispatch(changeLoading({ open: false }));
            dispatch(success(false));
            console.log("error", error);
        })
}