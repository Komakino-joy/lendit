import { all, call, takeLatest, put  } from 'redux-saga/effects';

import { 
    httpRegisterUser, 
    httpSignInUser 
} from '../../services/api';

import SiteMemberActionTypes from './site-member.types';

import {
    registrationFailure,
    registrationSuccess,
    signInFailure,
    signInSuccess, 
} from './site-member.actions'


export function* signIn({payload: {email, password}}) {
    try{
        const userData = yield httpSignInUser(email, password);
        yield put(signInSuccess(userData));
    }catch(error){
        yield call(alert, 'Invalid Credentials', error );
        yield put(signInFailure(error));
    };
};

export function* register({payload: { fname, lname, email, password }}) {
    try{
        yield httpRegisterUser(fname, lname, email, password);
        yield put(registrationSuccess({email, password})); 
    }catch(error){
        yield put(registrationFailure(error));
    } 
};

export function* onSignInStart() {
    yield takeLatest(SiteMemberActionTypes.SIGN_IN_START, signIn)
};

export function* onRegistrationStart() {
    yield takeLatest(SiteMemberActionTypes.REGISTER_START, register)
};

export function* siteMemberSagas() {
    yield all([
        call(onRegistrationStart),
        call(onSignInStart),
    ]);
};