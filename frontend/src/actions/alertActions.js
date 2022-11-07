import axios from 'axios';
import { GET_ALERTS, ADD_ALERT, DELETE_ALERT, ALERTS_LOADING } from "./types";

export const getAlerts = () => dispatch => {
    dispatch(setAlertsLoading());
    axios.get('/api/alerts').then(res =>
        dispatch({
            type: GET_ALERTS,
            payload: res.data
        })
    );
};

export const deleteAlert = (id) => dispatch => {
    axios.delete(`/api/alert/${id}`).then(res =>
        dispatch({
            type: DELETE_ALERT,
            payload: id
        })
    );
};

export const addAlert = (alert)=> dispatch => {
    axios.post('/api/alert', alert).then(res =>
        dispatch({
            type: ADD_ALERT,
            payload: res.data
        })
    );
};

export const setAlertsLoading = () => {
    return {
        type: ALERTS_LOADING
    };
};