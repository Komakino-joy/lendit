import { call, put, takeLatest, all } from "redux-saga/effects";

  import DropDownActionTypes from './drop-down.types';

  import { 
      receiveAssetDropDownOptions,
      receiveUserDropDownOptions,
      receiveModelDropDownOptions
    } from "./drop-down.actions";

  import { 
      fetchAllAssetsForDropDown,
      fetchAllUsersForDropDown ,
      fetchAllModelsForDropDown
    } from "../../services/api";


  function* getAssetList(dropDownOptions) {
    try {
      const assetList = yield call(fetchAllAssetsForDropDown, dropDownOptions);
      yield put(receiveAssetDropDownOptions(assetList));
    } catch (error) {
      console.log(error);
    }
  };
  
  export  function* requestAssetListSaga() {
    yield takeLatest(DropDownActionTypes.REQUEST_ASSET_DROP_DOWN_OPTIONS, getAssetList);
  };
  
  function* getUserList(dropDownOptions) {
    try {
      const userList = yield call(fetchAllUsersForDropDown, dropDownOptions);
      yield put(receiveUserDropDownOptions(userList));
    } catch (error) {
      console.log(error);
    }
  };
  
  export  function* requestUserListSaga() {
    yield takeLatest(DropDownActionTypes.REQUEST_USER_DROP_DOWN_OPTIONS, getUserList);
  };
  
  function* getModelList(dropDownOptions) {
    try {
      const modelList = yield call(fetchAllModelsForDropDown, dropDownOptions);
      yield put(receiveModelDropDownOptions(modelList));
    } catch (error) {
      console.log(error);
    }
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