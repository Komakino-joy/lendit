import { call, put, takeLatest, all } from "redux-saga/effects";

  import DropDownActionTypes from './drop-down.types';

  import { 
      fetchAssetDropDownOptionsSuccess,
      fetchAssetDropDownOptionsFailure,
      fetchUserDropDownOptionsSuccess,
      fetchUserDropDownOptionsFailure,
      fetchModelDropDownOptionsSuccess,
      fetchModelDropDownOptionsFailure
    } from "./drop-down.actions";

  import { 
      httpFetchAllAssetsForDropDown,
      httpFetchAllUsersForDropDown ,
      httpFetchAllModelsForDropDown,
    } from "../../services/api";


  export function* fetchAssetList({ payload: { memberId } }) {
    try {
      const response = yield httpFetchAllAssetsForDropDown(memberId);
      yield put(fetchAssetDropDownOptionsSuccess(response.assetList));
    } catch (error) {
      fetchAssetDropDownOptionsFailure(error);
    }
  };

  export function* fetchUserList({ payload: { memberId } }) {
    try {
      const response = yield httpFetchAllUsersForDropDown(memberId);
      yield put(fetchUserDropDownOptionsSuccess(response.userList));
    } catch (error) {
      fetchUserDropDownOptionsFailure(error);
    }
  };
  
  export function* fetchModelList({ payload: { memberId } }) {
    try {
      const response = yield httpFetchAllModelsForDropDown(memberId);
      yield put(fetchModelDropDownOptionsSuccess(response.modelList));
    } catch (error) {
      fetchModelDropDownOptionsFailure(error);
    }
  };

  export  function* fetchAssetListStartSaga() {
    yield takeLatest(DropDownActionTypes.FETCH_ASSET_DROP_DOWN_OPTIONS_START, fetchAssetList);
  };

  export  function* fetchUserListStartSaga() {
    yield takeLatest(DropDownActionTypes.FETCH_USER_DROP_DOWN_OPTIONS_START, fetchUserList);
  };

  export  function* fetchModelListStartSaga() {
    yield takeLatest(DropDownActionTypes.FETCH_MODEL_DROP_DOWN_OPTIONS_START, fetchModelList);
  };

  export function* dropDownSagas() {
    yield all([ 
      call(fetchAssetListStartSaga),
      call(fetchUserListStartSaga),
      call(fetchModelListStartSaga),
    ])
};