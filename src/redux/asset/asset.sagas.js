import { call, put, takeLatest, all } from "redux-saga/effects";

import { 
    REQUEST_SELECTED_ASSET,
    CHECK_IN_SELECTED_ASSET_START,
    CHECK_OUT_SELECTED_ASSET_START,
    QUARANTINE_SELECTED_ASSET_START,
    receiveSelectedAssetData,
    checkInSelectedAssetSuccess,
    checkOutSelectedAssetSuccess, 
    quarantineSelectedAssetSuccess
   } from "../asset/asset.actions";

import { 
  fetchSelectedAssetData,
  checkInAsset,
  checkOutAsset,
  quarantineAsset
 } from "../../services/api";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getRequestedSelectedAssetData(action) {
  try {
    // do api call
    const assetData = yield call(fetchSelectedAssetData, action.assetID, action.ownerID);
    yield put(receiveSelectedAssetData(assetData));
  } catch (error) {
    console.log(error);
  }
};

export  function* requestSelectedAssetSaga() {
  yield takeLatest(REQUEST_SELECTED_ASSET, getRequestedSelectedAssetData);
};

function* postCheckInSelectedAsset(action) {
  console.log(action)
  try{
    const assetData = yield call(checkInAsset, action.assetID, action.userId, action.ownerId, action.assetName, action.assetSerial, action.assetModel )
    yield put(checkInSelectedAssetSuccess(assetData))
  }  catch (error) {
    console.log(error)
  }
};

export  function* checkInSelectedAssetSaga() {
  yield takeLatest(CHECK_IN_SELECTED_ASSET_START, postCheckInSelectedAsset);
};

function* postCheckOutSelectedAsset(action) {
  try{
    const assetData = yield call(checkOutAsset, action.assetID, action.userID, action.ownerId, action.assetName, action.assetSerial, action.assetModel )
    yield put(checkOutSelectedAssetSuccess(assetData))
  }  catch (error) {
    console.log(error)
  }
};

export  function* checkOutSelectedAssetSaga() {
  yield takeLatest(CHECK_OUT_SELECTED_ASSET_START, postCheckOutSelectedAsset);
};

function* postQuarantineSelectedAsset(action) {
  try{
    const assetData = yield call(quarantineAsset, action.assetID, action.userID, action.ownerId, action.assetName, action.assetSerial, action.assetModel, action.comment )
    yield put(quarantineSelectedAssetSuccess(assetData))
  }  catch (error) {
    console.log(error)
  }
};

export  function* quarantineSelectedAssetSaga() {
  yield takeLatest(QUARANTINE_SELECTED_ASSET_START, postQuarantineSelectedAsset);
};


export function* assetSagas() {
    yield all([
      call(requestSelectedAssetSaga), 
      call(checkInSelectedAssetSaga),
      call(checkOutSelectedAssetSaga),
      call(quarantineSelectedAssetSaga)
    ])
};