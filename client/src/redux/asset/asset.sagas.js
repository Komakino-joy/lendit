import { all, call, takeLatest, put  } from 'redux-saga/effects';
import AssetActionTypes from './asset.types';

import { 
  fetchSelectedAssetDetailsSuccess,
  fetchSelectedAssetDetailsFailure,
  addNewAssetSuccess, 
  addNewAssetFailure, 
  checkInSelectedAssetSuccess,
  checkInSelectedAssetFailure,
  checkOutSelectedAssetSuccess,
  checkOutSelectedAssetFailure,
  quarantineSelectedAssetSuccess,
  quarantineSelectedAssetFailure,
  removeSelectedAssetSuccess,
  removeSelectedAssetFailure,
} from './asset.actions';

import { 
  httpFetchSelectedAssetDetails,
  httpCreateNewAsset,
  httpCheckInAsset,
  httpCheckOutAsset,
  httpQuarantineAsset,
  httpRemoveAsset,
} from '../../services/api';


function* fetchRequestedAssetDetails({payload: {selectedAssetId, memberId}}) {
  try {
    const assetData = yield httpFetchSelectedAssetDetails(selectedAssetId, memberId);
    yield put(fetchSelectedAssetDetailsSuccess(assetData));
  } catch (error) {
    yield put(fetchSelectedAssetDetailsFailure(error));
  }
};


export function* addNewAsset({payload: { formattedAssetId, assetName, assetModel, assetSerial, memberId, responseAlert, inputReset }}) {
  try{
      const response = yield httpCreateNewAsset(formattedAssetId, assetName, assetModel, assetSerial, memberId);
      yield put(addNewAssetSuccess(response.newAsset)); 
      yield call(() => responseAlert(response.message, "success"));
      yield call(() => inputReset());
  }catch(error){
      yield put(addNewAssetFailure(error));
      yield call(() => responseAlert(error.response.data.message, "error"));
  } 
};

function* postCheckInSelectedAsset({payload: {assetId, userId, memberId, assetName, assetSerial, assetModel}}) {
  try{
    const response = yield httpCheckInAsset(assetId, userId, memberId, assetName, assetSerial, assetModel);

    yield put(checkInSelectedAssetSuccess({ 
        selectedAsset: {
          ...response.updatedAsset, 
          userId, 
          memberId
        }
      })
      )

  }  catch (error) {
    yield put(checkInSelectedAssetFailure(error))
  }
};

function* postCheckOutSelectedAsset({payload: {assetId, userId, memberId, assetName, assetSerial, assetModel, fname, lname}}) {
  try{
    const response = yield httpCheckOutAsset(assetId, userId, memberId, assetName, assetSerial, assetModel, fname, lname);
    yield put(checkOutSelectedAssetSuccess({ 
      selectedAsset: {
        ...response.updatedAsset, 
        fname, 
        lname
      }
    }))

  }  catch (error) {
    yield put(checkOutSelectedAssetFailure(error))
  }
};

function* postQuarantineSelectedAsset({payload: {assetId, userId, memberId, assetName, assetSerial, assetModel, assetComments}}) {
  try{
    const response = yield httpQuarantineAsset(assetId, userId, memberId, assetName, assetSerial, assetModel, assetComments);
    yield put(quarantineSelectedAssetSuccess({ 
      selectedAsset: {
        ...response.updatedAsset, 
        assetComments, 
        userId
      }
    }))
  }  catch (error) {
    yield put(quarantineSelectedAssetFailure(error))
  }
};

function* postRemoveSelectedAsset({payload: {assetId, memberId, responseAlert}}) {
  try{
    const response = yield httpRemoveAsset(memberId, assetId);
    yield call(() => responseAlert(response.message, "success"));
    yield put(removeSelectedAssetSuccess(response.deletedAssetId));
    
   }  catch (error) {
    yield call(() => responseAlert(error.response.data.message, "error"));
    yield put(removeSelectedAssetFailure(error));
  }
};


export  function* fetchSelectedAssetStartSaga() {
  yield takeLatest(AssetActionTypes.FETCH_SELECTED_ASSET_START, fetchRequestedAssetDetails);
};

export  function* checkInSelectedAssetStartSaga() {
  yield takeLatest(AssetActionTypes.CHECK_IN_SELECTED_ASSET_START, postCheckInSelectedAsset);
};

export  function* checkOutSelectedAssetStartSaga() {
  yield takeLatest(AssetActionTypes.CHECK_OUT_SELECTED_ASSET_START, postCheckOutSelectedAsset);
};

export  function* quarantineSelectedAssetStartSaga() {
  yield takeLatest(AssetActionTypes.QUARANTINE_SELECTED_ASSET_START, postQuarantineSelectedAsset);
};

export  function* removeSelectedAssetStartSaga() {
  yield takeLatest(AssetActionTypes.REMOVE_SELECTED_ASSET_START, postRemoveSelectedAsset);
};

export function* addNewAssetStartSaga() {
  yield takeLatest(AssetActionTypes.ADD_NEW_ASSET_START , addNewAsset)
};

export function* assetSagas() {
  yield all([
      call(fetchSelectedAssetStartSaga),
      call(checkInSelectedAssetStartSaga),
      call(checkOutSelectedAssetStartSaga),
      call(quarantineSelectedAssetStartSaga),
      call(removeSelectedAssetStartSaga),
      call(addNewAssetStartSaga),
  ]);
};