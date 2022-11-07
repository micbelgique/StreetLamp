import { GET_ALERTS, ADD_ALERT, DELETE_ALERT, UPDATE_ALERT, ALERTS_LOADING } from "../actions/types";

const initialState = {
    alerts: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALERTS:
            return {
                ...state,
                alerts: action.payload,
                loading: false
            };
        case DELETE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload)
            };
        case ADD_ALERT:
            return {
                ...state,
                alerts: [action.payload, ...state.alerts]
            };
        case ALERTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
        }
}