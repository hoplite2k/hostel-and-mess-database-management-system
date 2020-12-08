import { CHART_FAIL, CHART_REQUEST, CHART_SUCCESS } from '../constants/chartconstants';

export const chartReducer = (state = { data: [] }, action) => {
    switch (action.type) {
        case CHART_REQUEST:
            return { loading: true, data: [] };
        case CHART_SUCCESS:
            return { loading: false, success: true, data: action.payload };
        case CHART_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};