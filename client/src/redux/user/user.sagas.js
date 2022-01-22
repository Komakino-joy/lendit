import { all, call, takeLatest, put  } from 'redux-saga/effects';

import UserActionTypes  from './user.types';
import { addNewUserSuccess, addNewUserFailure } from './user.actions';

import { httpCreateNewUser } from '../../services/api';


export function* addNewUser({payload: { formattedUserId, fname, lname, memberId, responseAlert, inputReset }}) {

  try{
      const response = yield httpCreateNewUser(formattedUserId, fname, lname, memberId);
      yield put(addNewUserSuccess(response.newUser)); 
      yield call(() => responseAlert(response.message, "success"));
      yield call(() => inputReset());
  }catch(error){
      yield put(addNewUserFailure(error));
      yield call(() => responseAlert(error.response.data.message, "error"));
  } 
};

export function* addNewUserStartSaga() {
  yield takeLatest(UserActionTypes.ADD_NEW_USER_START , addNewUser)
};

export function* userSagas() {
  yield all([
      call(addNewUserStartSaga),
  ]);
};