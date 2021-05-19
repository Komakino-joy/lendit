import { call, put, takeLatest, all } from "redux-saga/effects";

import AssetpayloadTypes from './asset.types';

import { 
    receiveSelectedAssetData,
    checkInSelectedAssetSuccess,
    checkOutSelectedAssetSuccess, 
    quarantineSelectedAssetSuccess
   } from "../asset/asset.actions";

import { 
  httpFetchSelectedAssetData,
  httpCheckInAsset,
  httpCheckOutAsset,
  httpQuarantineAsset
 } from "../../services/api";

function* getRequestedSelectedAssetData({payload: {assetId, ownerId}}) {
  try {
    const assetData = yield httpFetchSelectedAssetData(assetId, ownerId);
    yield put(receiveSelectedAssetData(assetData));
  } catch (error) {
    console.log(error);
  }
};

function* postCheckInSelectedAsset({payload: {assetId, userId, ownerId, assetName, assetSerial, assetModel}}) {
  try{
    const assetData = yield httpCheckInAsset(assetId, userId, ownerId, assetName, assetSerial, assetModel);
    yield put(checkInSelectedAssetSuccess({...assetData, userId}))
  }  catch (error) {
    console.log(error)
  }
};

function* postCheckOutSelectedAsset({payload: {assetId, userId, ownerId, assetName, assetSerial, assetModel}}) {
  try{
    const assetData = yield httpCheckOutAsset(assetId, userId, ownerId, assetName, assetSerial, assetModel);
    yield put(checkOutSelectedAssetSuccess({...assetData, userId}))
  }  catch (error) {
    console.log(error)
  }
};

function* postQuarantineSelectedAsset({payload: {assetId, userId, ownerId, assetName, assetSerial, assetModel, assetComments}}) {
  try{
    const assetData = yield httpQuarantineAsset(assetId, userId, ownerId, assetName, assetSerial, assetModel, assetComments);
    yield put(quarantineSelectedAssetSuccess({...assetData, assetComments, userId}))
  }  catch (error) {
    console.log(error)
  }
};

export  function* requestSelectedAssetSaga() {
  yield takeLatest(AssetpayloadTypes.REQUEST_SELECTED_ASSET, getRequestedSelectedAssetData);
};

export  function* checkInSelectedAssetSaga() {
  yield takeLatest(AssetpayloadTypes.CHECK_IN_SELECTED_ASSET_START, postCheckInSelectedAsset);
};

export  function* checkOutSelectedAssetSaga() {
  yield takeLatest(AssetpayloadTypes.CHECK_OUT_SELECTED_ASSET_START, postCheckOutSelectedAsset);
};

export  function* quarantineSelectedAssetSaga() {
  yield takeLatest(AssetpayloadTypes.QUARANTINE_SELECTED_ASSET_START, postQuarantineSelectedAsset);
};


export function* assetSagas() {
    yield all([
      call(requestSelectedAssetSaga), 
      call(checkInSelectedAssetSaga),
      call(checkOutSelectedAssetSaga),
      call(quarantineSelectedAssetSaga)
    ])
};