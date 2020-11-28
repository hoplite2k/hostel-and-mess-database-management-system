import axios from 'axios';
import { MESS_LIST_REQUEST, MESS_LIST_SUCCESS, MESS_LIST_FAIL, MESS_DETAILS_FAIL, MESS_DETAILS_REQUEST, MESS_DETAILS_SUCCESS} from '../constants/messconstants';

export const listmess = () => async (dispatch, getState) => {
    try {
        dispatch({type: MESS_LIST_REQUEST});

        const {userlogin: {userinfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/mess', config);
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

export const listmessdetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: MESS_DETAILS_REQUEST});

        const {userlogin: {userinfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get(`/mess/${id}`, config);
        dispatch({
            type: MESS_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MESS_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};
