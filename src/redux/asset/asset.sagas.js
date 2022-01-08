import { call, put, takeLatest, all } from "redux-saga/effects";

import AssetActionTypes from './asset.types';

import { 
    receiveSelectedAssetData,
    checkInSelectedAssetSuccess,
    checkOutSelectedAssetSuccess, 
    quarantineSelectedAssetSuccess,
    removeSelectedAssetSuccess,
    failureSelectedAssetData,
    checkInSelectedAssetFailure,
    checkOutSelectedAssetFailure,
    quarantineSelectedAssetFailure,
    removeSelectedAssetFailure
   } from "../asset/asset.actions";

import { 
  httpFetchSelectedAssetData,
  httpCheckInAsset,
  httpCheckOutAsset,
  httpQuarantineAsset,
  httpRemoveAsset,
 } from "../../services/api";

function* getRequestedSelectedAssetData({payload: {assetId, ownerId}}) {
  try {
    const assetData = yield httpFetchSelectedAssetData(assetId, ownerId);
    yield put(receiveSelectedAssetData(assetData));
  } catch (error) {
    yield put(failureSelectedAssetData(error));
  }
};

function* postCheckInSelectedAsset({payload: {assetId, userId, currentMemberId, assetName, assetSerial, assetModel}}) {
  try{
    const assetData = yield httpCheckInAsset(assetId, userId, currentMemberId, assetName, assetSerial, assetModel);
    yield put(checkInSelectedAssetSuccess({...assetData, userId, currentMemberId}))
  }  catch (error) {
    yield put(checkInSelectedAssetFailure(error))
  }
};

function* postCheckOutSelectedAsset({payload: {assetId, userId, currentMemberId, assetName, assetSerial, assetModel, message}}) {
  try{
    const assetData = yield httpCheckOutAsset(assetId, userId, currentMemberId, assetName, assetSerial, assetModel);

    if (assetData.message) {
      return yield put(checkOutSelectedAssetFailure(assetData.message))
    }

    yield put(checkOutSelectedAssetSuccess({...assetData, userId}))

  }  catch (error) {
    yield put(checkOutSelectedAssetFailure(error))
  }
};

function* postQuarantineSelectedAsset({payload: {assetId, userId, currentMemberId, assetName, assetSerial, assetModel, assetComments}}) {
  try{
    const assetData = yield httpQuarantineAsset(assetId, userId, currentMemberId, assetName, assetSerial, assetModel, assetComments);
    yield put(quarantineSelectedAssetSuccess({...assetData, assetComments, userId}))
  }  catch (error) {
    yield put(quarantineSelectedAssetFailure(error))
  }
};

function* postRemoveSelectedAsset({payload: {assetId}}) {
  try{
    const assetData = yield httpRemoveAsset(assetId);
    yield put(removeSelectedAssetSuccess(assetData))
   }  catch (error) {
    yield put(removeSelectedAssetFailure(error))
  }
};

export  function* requestSelectedAssetSaga() {
  yield takeLatest(AssetActionTypes.REQUEST_SELECTED_ASSET_START, getRequestedSelectedAssetData);
};

export  function* checkInSelectedAssetSaga() {
  yield takeLatest(AssetActionTypes.CHECK_IN_SELECTED_ASSET_START, postCheckInSelectedAsset);
};

export  function* checkOutSelectedAssetSaga() {
  yield takeLatest(AssetActionTypes.CHECK_OUT_SELECTED_ASSET_START, postCheckOutSelectedAsset);
};

export  function* quarantineSelectedAssetSaga() {
  yield takeLatest(AssetActionTypes.QUARANTINE_SELECTED_ASSET_START, postQuarantineSelectedAsset);
};

export  function* removeSelectedAssetSaga() {
  yield takeLatest(AssetActionTypes.REMOVE_SELECTED_ASSET_START, postRemoveSelectedAsset);
};


export function* assetSagas() {
    yield all([
      call(requestSelectedAssetSaga), 
      call(checkInSelectedAssetSaga),
      call(checkOutSelectedAssetSaga),
      call(quarantineSelectedAssetSaga),
      call(removeSelectedAssetSaga),
    ])
};