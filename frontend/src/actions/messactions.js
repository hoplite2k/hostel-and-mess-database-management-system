import axios from 'axios';
import { MESS_LIST_REQUEST, MESS_LIST_SUCCESS, MESS_LIST_FAIL } from '../constants/messconstants';

export const listmess = () => async (dispatch) => {
    try {
        dispatch({type: MESS_LIST_REQUEST});

        const { data } = await axios.get('/mess');
        dispatch({
            type: MESS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MESS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
