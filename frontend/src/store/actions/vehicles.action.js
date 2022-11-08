import { HttpAuth, HttpAuthUpload } from "../../config/Http";
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
    UPLOAD_PHOTO: 'VEHICLE_UPLOAD_PHOTO',
    DELETE_PHOTO: 'VEHICLE_DELETE_PHOTO',
    REORDER_PHOTO: 'VEHICLE_REORDER_PHOTO'
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

export const uploadPhotoResponse = (payload) => ({
    type: actionTypes.UPLOAD_PHOTO,
    payload
})

export const uploadPhoto = (item) => dispatch => {
    dispatch(indexResponse({ upload_photo: true }));
    const endpoint = '/api/upload/vehicle';
    return HttpAuthUpload.post(`${endpoint}`, item)
        .then(res => {
            dispatch(indexResponse({ upload_photo: false }));

            if (res.data.id) dispatch(uploadPhotoResponse(res.data));
        })
        .catch(error => {
            console.log("error", error)
        })
}


export const deletePhotoResponse = (payload) => ({
    type: actionTypes.DELETE_PHOTO,
    payload
})

export const deletePhoto = (id) => dispatch => {
    const endpoint = '/api/upload/vehicle';
    return HttpAuthUpload.delete(`${endpoint}/${id}`)
        .then(res => {
            if (res.data.id) dispatch(deletePhotoResponse(res.data));
        })
        .catch(error => {
            console.log("error", error)
        })
}

export const reorderPhotoResponse = (payload) => ({
    type: actionTypes.REORDER_PHOTO,
    payload
})

export const reorderPhoto = (position, data) => dispatch => {

    dispatch(reorderPhotoResponse(data));

    const endpoint = '/api/upload/vehicle/any';
    return HttpAuth.put(`${endpoint}`, position)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log("error", error)
        })
}

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
            const { data } = error.response;

            if (data.error) dispatch(errors(data.error));

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
            const { data } = error.response;

            if (data.error) dispatch(errors(data.error));

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
            const { data } = error.response;

            if (data.error) dispatch(errors(data.error));
            console.log("error", error)
        })
}

export const destroyResponse = (payload) => ({
    typeof: actionTypes.DESTROY,
    payload
})

export const destroy = (id) => dispatch => {
    const endpoint = '/api/vehicles';
    return HttpAuth.delete(`${endpoint}/${id}`)
        .then(res => {
            dispatch(destroyResponse(id));
        })
        .catch(error => {

            const { data } = error.response;

            if (data.error) dispatch(errors(data.error));

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
            console.log("error", error);
        })
}

export const get_cep = (zipCode) => dispatch => {
    const endpoint = '/api/webservice/cep';
    const body = { cep: zipCode };
    return HttpAuth.post(`${endpoint}`, body)
        .then(res => {
            dispatch(change(res.data))
            return res;
        })
        .catch(error => {
            const { data } = error.response;
            if (data.error) dispatch(errors(data.error));
            console.log("error", error);
        })
}