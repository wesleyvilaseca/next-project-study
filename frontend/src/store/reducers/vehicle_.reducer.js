import { actionTypes } from '../actions/vehicle_.action';

const initialState = {
    vehicles: {
        data: []
    },
    success: false,
    error: {},
}

export default (state = initialState, { type, payload, isLoadMore }) => {
    switch (type) {

        case actionTypes.INDEX:
            if (isLoadMore) {
                /*durante a paginação eu concateno ao estado antigo o que ta vindo no payload(api) */
                payload.vehicles.data = state.vehicles.data.concat(payload.vehicles.data)
            }
            return { ...state, ...payload }

        case actionTypes.SUCCESS:
            return {
                /**mescla o stado que já tem com o paylod */
                ...state,
                success: payload
            }
        case actionTypes.ERROR:
            return {
                /**mescla o stado que já tem com o paylod */
                ...state,
                error: payload
            }
        default:
            return state
    }
}
