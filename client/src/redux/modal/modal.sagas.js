import { all, call, takeLatest, put  } from 'redux-saga/effects';

import { 
    httpFetchEmailDistro,
    httpAddEmailToDistro,
    httpDeleteEmailFromDistro,
    httpDeleteUser
} from '../../services/api';

import ModalActionTypes from './modal.types';

import {
    fetchEmailDistroSuccess,
    fetchEmailDistroFailure,
    addEmailToDistroSuccess,
    addEmailToDistroFailure,
    deleteEmailFromDistroSuccess,
    deleteEmailFromDistroFailure,
    deleteUserSuccess,
    deleteUserFailure
} from './modal.actions'


export function* fetchEmailDistro({ payload: { memberId }}) {
    try{
        const response = yield httpFetchEmailDistro(memberId);
        yield put(fetchEmailDistroSuccess(response));
    }catch(error){
        yield put(fetchEmailDistroFailure(error));
    };
};

export function* addEmailToDistro({payload: {memberId, email, responseAlert, inputReset }}) {
    try{
        const response = yield httpAddEmailToDistro(memberId, email);
        yield put(addEmailToDistroSuccess(response.emailDistro));
        yield call(() => responseAlert(response.message, "success"));
        yield call(() => inputReset());
    }catch(error){
        yield put(addEmailToDistroFailure(error));
        yield call(() => responseAlert(error.response.data.message, "error"));
    };
};

export function* deleteEmailFromDistro({payload: {memberId, email, responseAlert}}) {
    try{
        const response = yield httpDeleteEmailFromDistro(memberId, email);
        yield put(deleteEmailFromDistroSuccess(response.emailDistro));
        yield call(() => responseAlert(response.message, "success"));
    }catch(error){
        yield put(deleteEmailFromDistroFailure(error));
        yield call(() => responseAlert(error.response.data.message, "error"));
    };
};

export function* deleteUser({payload: {memberId, userId, responseAlert }}) {
    try{
        const response = yield httpDeleteUser(memberId, userId);
        yield put(deleteUserSuccess(response.deletedUserId));
        yield call(() => responseAlert(response.message, "success"));
    }catch(error){
        yield put(deleteUserFailure(error));
        yield call(() => responseAlert(error.response.data.message, "error"));
    };
};

export function* fetchEmailDistroStartSaga() {
    yield takeLatest(ModalActionTypes.FETCH_EMAIL_DISTRO_START, fetchEmailDistro)
};

export function* addEmailToDistroStartSaga() {
    yield takeLatest(ModalActionTypes.ADD_EMAIL_TO_DISTRO_START, addEmailToDistro)
};

export function* deleteEmailFromDistroStartSaga() {
    yield takeLatest(ModalActionTypes.DELETE_EMAIL_FROM_DISTRO_START, deleteEmailFromDistro)
};


export function* deleteUserStartSaga() {
    yield takeLatest(ModalActionTypes.DELETE_USER_START, deleteUser)
};

export function* modalSagas() {
    yield all([
        call(fetchEmailDistroStartSaga),
        call(addEmailToDistroStartSaga),
        call(deleteEmailFromDistroStartSaga),
        call(deleteUserStartSaga),
    ]);
};