import axios from 'axios';
import { ROOM_LIST_REQUEST, ROOM_LIST_SUCCESS, ROOM_LIST_FAIL, ROOM_DETAILS_FAIL, ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS } from '../constants/roomconstants';

export const listrooms = () => async (dispatch) => {
    try {
        dispatch({type: ROOM_LIST_REQUEST});

        const { data } = await axios.get('/rooms');
        dispatch({
            type: ROOM_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};

export const listroomdetails = (id) => async (dispatch) => {
    try {
        dispatch({type: ROOM_DETAILS_REQUEST});

        const { data } = await axios.get(`/rooms/${id}`);
        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
