import { call, put, takeLatest, all } from "redux-saga/effects";

import UserActionTypes from './user.types';

import { 
    receiveSelectedUserData
  } from "../user/user.actions";
import { httpFetchSelectedUserData } from '../../services/api';

function* getUserData(action) {
    try{
        const userData = yield call(httpFetchSelectedUserData, action.userID);
        yield put (receiveSelectedUserData(userData));
    } catch(error) {
        console.log(error);
    }
};

export function* requestSelectedUserSaga() {
    yield takeLatest( UserActionTypes.REQUEST_SELECTED_USER, getUserData ) ;
};


export function* userSagas() {
    yield all ( [ 
        call(requestSelectedUserSaga)
    ] )
};