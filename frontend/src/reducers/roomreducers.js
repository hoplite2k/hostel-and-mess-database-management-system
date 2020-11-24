import { ROOM_LIST_REQUEST, ROOM_LIST_SUCCESS, ROOM_LIST_FAIL } from '../constants/roomconstants';

export const roomlistReducer = (state = {rooms:[]}, action) => {
    switch(action.type){
        case ROOM_LIST_REQUEST:
            return {loading: true, rooms:[]};
        case ROOM_LIST_SUCCESS:
            return {loading: false, rooms:action.payload};
        case ROOM_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
};
