import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { studentlistReducer, studentdetailsReducer } from './reducers/studentreducers';
import { employeelistReducer, employeedetailsReducer } from './reducers/employeereducers';
import { roomlistReducer, roomdetailsReducer } from './reducers/roomreducers';
import { messlistReducer, messdetailsReducer } from './reducers/messreducers';
import { userloginReducer, userdetailsReducer,userupdatepasswordReducer } from './reducers/userreducers';


const reducer = combineReducers({
    studentlist: studentlistReducer,
    employeelist: employeelistReducer,
    roomlist: roomlistReducer,
    messlist: messlistReducer,

    studentdetails: studentdetailsReducer,
    employeedetails: employeedetailsReducer,
    roomdetails: roomdetailsReducer,
    messdetails: messdetailsReducer,

    userlogin: userloginReducer,
    userdetails: userdetailsReducer,
    userupdatepassword: userupdatepasswordReducer,
});

const userinfofromstorage = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : null;

const initialState = {
    userlogin : { userinfo: userinfofromstorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;