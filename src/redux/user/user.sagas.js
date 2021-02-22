import { call, put, takeLatest, all } from "redux-saga/effects";
import { 
    REQUEST_SELECTED_USER,
    receiveSelectedUserData
  } from "../user/user.actions";
import { fetchSelectedUserData } from '../../services/api';

function* getUserData(action) {
    try{
        const userData = yield call(fetchSelectedUserData, action.userID);
        yield put (receiveSelectedUserData(userData));
    } catch(error) {
        console.log(error);
    }
};

export function* requestSelectedUserSaga() {
    yield takeLatest( REQUEST_SELECTED_USER, getUserData ) ;
};


export function* userSagas() {
    yield all ( [ 
        call(requestSelectedUserSaga)
    ] )
};