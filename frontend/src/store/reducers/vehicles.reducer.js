import { actionTypes } from '../actions/vehicles.action';

const initialState = {
    vehicles: {
        data: []
    },
    vehicle: {},
    vehicle_brand: [],
    vehicle_model: [],
    vehicle_version: [],
    vehicle_regdate: [],
    success: false,
    error: {}
}

export default (state = initialState, { type, payload, isLoadMore }) => {
    switch (type) {

        case actionTypes.INDEX:
            if (isLoadMore) {
                /*durante a paginação eu concateno ao estado antigo o que ta vindo no payload(api) */
                payload.vehicles.data = state.vehicles.data.concat(payload.vehicles.data)
            }
            return { ...state, ...payload }

        case actionTypes.DESTROY:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    /*dentro do paylod destroy está indo apendas id*/
                    data: state.vehicles.data.filter(item => item.id !== payload)
                }
            }
        case actionTypes.CHANGE:
            return {
                ...state,
                vehicle: {
                    ...state.vehicle,
                    ...payload
                }
            }

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
