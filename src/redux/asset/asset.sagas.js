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
    const assetData = yield httpCheckInAsset(assetId, userId, ownerId, assetName, assetSerial, assetModel );
    console.log('PAAAAAAAAAAAAAAAYUPPPPPPPPPPPP', assetData)
    console.log(assetData)
    yield put(checkInSelectedAssetSuccess(assetId, userId, ownerId, assetName, assetSerial, assetModel))
  }  catch (error) {
    console.log(error)
  }
};

function* postCheckOutSelectedAsset(payload) {
  try{
    const assetData = yield call(httpCheckOutAsset, payload.assetID, payload.userID, payload.ownerId, payload.assetName, payload.assetSerial, payload.assetModel )
    yield put(checkOutSelectedAssetSuccess(assetData))
  }  catch (error) {
    console.log(error)
  }
};

function* postQuarantineSelectedAsset(payload) {
  try{
    const assetData = yield call(httpQuarantineAsset, payload.assetID, payload.userID, payload.ownerId, payload.assetName, payload.assetSerial, payload.assetModel, payload.comment )
    yield put(quarantineSelectedAssetSuccess(assetData))
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