import { call, put, takeLatest, all } from "redux-saga/effects";

  import DropDownActionTypes from './drop-down.types';

  import { 
      receiveAssetDropDownOptions,
      receiveUserDropDownOptions,
      receiveModelDropDownOptions
    } from "./drop-down.actions";

  import { 
      httpFetchAllAssetsForDropDown,
      fetchAllUsersForDropDown ,
      httpFetchAllModelsForDropDown
    } from "../../services/api";


  function* getAssetList({payload}) {
    try {
      const assetList = yield httpFetchAllAssetsForDropDown(payload);
      yield put(receiveAssetDropDownOptions(assetList));
    } catch (error) {
      console.log(error);
    }
  };
  
  function* getUserList({payload}) {
    try {
      const userList = yield fetchAllUsersForDropDown(payload);
      yield put(receiveUserDropDownOptions(userList));
    } catch (error) {
      console.log(error);
    }
  };
  
  function* getModelList({payload}) {
    try {
      const modelList = yield httpFetchAllModelsForDropDown(payload);
      yield put(receiveModelDropDownOptions(modelList));
    } catch (error) {
      console.log(error);
    }
  };

  export  function* requestAssetListSaga() {
    yield takeLatest(DropDownActionTypes.REQUEST_ASSET_DROP_DOWN_OPTIONS, getAssetList);
  };

  export  function* requestUserListSaga() {
    yield takeLatest(DropDownActionTypes.REQUEST_USER_DROP_DOWN_OPTIONS, getUserList);
  };

  export  function* requestModelListSaga() {
    yield takeLatest(DropDownActionTypes.REQUEST_MODEL_DROP_DOWN_OPTIONS, getModelList);
  };

  export function* dropDownSagas() {
    yield all([
      call(requestAssetListSaga), 
      call(requestUserListSaga),
      call(requestModelListSaga)
    ])
};