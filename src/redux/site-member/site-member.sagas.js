import { all, call, takeLatest, put } from 'redux-saga/effects';

import { 
    httpRegisterUser, 
    httpSignInUser 
} from '../../services/api';

import SiteMemberActionTypes from './site-member.types';

import {
    registrationFailure,
    registrationSuccess,
    signInFailure,
    signInSuccess
} from './site-member.actions'

export function* register({payload: { fname, lname, email, password }}) {
    try{
        const user = yield  httpRegisterUser(fname, lname, email, password);
        yield put(registrationSuccess(user)); 
    }catch(error){
        yield put(registrationFailure(error));
    } 
};

export function* signIn({payload: {email, password}}) {
    try{
        const user = yield httpSignInUser(email, password);
        console.log('Helloooooooooooo',user);
        yield put(signInSuccess(user));
    }catch(error){
        yield put(signInFailure(error));
    };
};

export function* onRegistrationStart() {
    yield takeLatest(SiteMemberActionTypes.REGISTER_START, register)
};

export function* onSignInStart() {
    yield takeLatest(SiteMemberActionTypes.SIGN_IN_START, signIn)
}

export function* siteMemberSagas() {
    yield all([
        call(onRegistrationStart),
        call(onSignInStart),
    ]);
};