import { CHART_FAIL, CHART_REQUEST, CHART_SUCCESS } from '../constants/chartconstants';
import axios from 'axios';

export const getchart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: CHART_REQUEST });

        const { userlogin: { userinfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userinfo.token}`,
            }
        };

        const { data } = await axios.get('/api/ml', config);
        dispatch({
            type: CHART_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CHART_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response,
        });
    }
};