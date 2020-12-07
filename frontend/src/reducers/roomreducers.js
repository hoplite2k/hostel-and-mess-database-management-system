import { ROOM_LIST_REQUEST, ROOM_LIST_SUCCESS, ROOM_LIST_FAIL, ROOM_DETAILS_FAIL, ROOM_DETAILS_REQUEST, ROOM_DETAILS_SUCCESS, ROOMSET_ADD_FAIL, ROOMSET_ADD_REQUEST, ROOMSET_ADD_RESET, ROOMSET_ADD_SUCCESS, ROOMSET_DELETE_FAIL, ROOMSET_DELETE_REQUEST, ROOMSET_DELETE_SUCCESS, ROOM_SEARCH_REQUEST, ROOM_SEARCH_SUCCESS, ROOM_SEARCH_FAIL, ROOM_LIST_ALL_REQUEST, ROOM_LIST_ALL_SUCCESS, ROOM_LIST_ALL_FAIL } from '../constants/roomconstants';

export const roomlistReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ROOM_LIST_REQUEST:
            return { loading: true, rooms: [] };
        case ROOM_LIST_SUCCESS:
            return { loading: false, rooms: action.payload };
        case ROOM_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const roomdetailsReducer = (state = { room: { inmates: [{}] } }, action) => {
    switch (action.type) {
        case ROOM_DETAILS_REQUEST:
            return { loading: true, ...state };
        case ROOM_DETAILS_SUCCESS:
            return { loading: false, room: action.payload };
        case ROOM_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteroomsetReducer = (state = {}, action) => {
    switch (action.type) {
        case ROOMSET_DELETE_REQUEST:
            return { loading: true };
        case ROOMSET_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ROOMSET_DELETE_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const addroomsetReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case ROOMSET_ADD_REQUEST:
            return { loading: true };
        case ROOMSET_ADD_SUCCESS:
            return { loading: false, success: true, room: action.payload };
        case ROOMSET_ADD_FAIL:
            return { loading: false, success: false, error: action.payload };
        case ROOMSET_ADD_RESET:
            return { room: {} };
        default:
            return state;
    }
};

export const roomsearchReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ROOM_SEARCH_REQUEST:
            return { loading: true, rooms: [] };
        case ROOM_SEARCH_SUCCESS:
            return { loading: false, success: true, rooms: action.payload };
        case ROOM_SEARCH_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const roomlistallReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ROOM_LIST_ALL_REQUEST:
            return { loading: true, rooms: [] };
        case ROOM_LIST_ALL_SUCCESS:
            return { loading: false, success: true, rooms: action.payload };
        case ROOM_LIST_ALL_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};