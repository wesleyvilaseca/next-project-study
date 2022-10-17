import { Http } from "../../config/Http";
import { changeLoading } from "./loading.action";
import { changeNotify } from "./notify.action";

export const actionTypes = {
    CHANGE: 'CHANGE_REGISTER',
    SUCCESS: 'SUCCES_REGISTERS',
    ERROR: 'ERROR_REGISTER'
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

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token);
    dispatch(change({
        email: '',
        password: '',
        name: ''
    }))

    dispatch(success(true))
}

export const register = data => async dispatch => {
    dispatch(changeLoading({ open: true, msg: 'Cadastrando usuário...' }));

    return await Http.post('/api/register', data)
        .then(res => {
            dispatch(changeLoading({ open: false }));

            if (typeof res !== undefined) {
                const token = res.data.access_token;

                if (token) {
                    dispatch(changeNotify({
                        open: true,
                        class: success,
                        msg: 'Usuário cadastrado com sucesso'
                    }))

                    dispatch(setUserToken(token));
                }
            }
        })
        .catch(error => {
            dispatch(changeLoading({ open: false }));
            if (error.response) {
                dispatch(errors(error.response.data.errors));
            }
        })
}
