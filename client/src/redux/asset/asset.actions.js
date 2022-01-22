import AssetActionTypes from './asset.types'

export const fetchSelectedAssetDetailsStart = (assetAndOwner) => ({ 
  type: AssetActionTypes.FETCH_SELECTED_ASSET_START,
  payload: assetAndOwner,
});

export const fetchSelectedAssetDetailsSuccess = (assetData) => ({
   type: AssetActionTypes.FETCH_SELECTED_ASSET_SUCCESS,
   payload: assetData,
});

export const fetchSelectedAssetDetailsFailure = (error) => ({
  type: AssetActionTypes.FETCH_SELECTED_ASSET_FAILURE,
  payload: error,
});

export const addNewAssetStart = (assetDetails) => ({
  type: AssetActionTypes.ADD_NEW_ASSET_START,
  payload: assetDetails,
});

export const addNewAssetSuccess = (response) => ({
  type: AssetActionTypes.ADD_NEW_ASSET_SUCCESS,
  payload: response,
});

export const addNewAssetFailure = (error) => ({
  type: AssetActionTypes.ADD_NEW_ASSET_FAILURE,
  payload: error,
});

export const checkInSelectedAssetStart = (assetData ) => ({
  type: AssetActionTypes.CHECK_IN_SELECTED_ASSET_START,
  payload: assetData,
});

export const checkInSelectedAssetSuccess = (assetData) => ({
  type: AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS, 
  payload: assetData,
});

export const checkInSelectedAssetFailure = (error) => ({
  type: AssetActionTypes.CHECK_IN_SELECTED_ASSET_FAILURE, 
  payload: error,
});

export const checkOutSelectedAssetStart = (assetData) => ({
  type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_START,
  payload: assetData,
});

export const checkOutSelectedAssetSuccess = (assetData) => ({
  type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_SUCCESS, 
  payload: assetData,
});

export const checkOutSelectedAssetFailure = (error) => ({
  type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_FAILURE, 
  payload: error,
});

export const quarantineSelectedAssetStart = (assetData) => ({
  type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_START,
  payload: assetData,
});

export const quarantineSelectedAssetSuccess = (assetData) => ({
  type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_SUCCESS, 
  payload: assetData
});

export const quarantineSelectedAssetFailure = (error) => ({
  type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_FAILURE, 
  payload: error
});

export const removeSelectedAssetStart = (assetData) => ({
  type: AssetActionTypes.REMOVE_SELECTED_ASSET_START,
  payload: assetData,
});

export const removeSelectedAssetSuccess = (memberId) => ({
  type: AssetActionTypes.REMOVE_SELECTED_ASSET_SUCCESS, 
  payload: memberId
});

export const removeSelectedAssetFailure = (error) => ({
  type: AssetActionTypes.REMOVE_SELECTED_ASSET_FAILURE, 
  payload: error
});

export const fetchAssetBreakdownStart = (memberId) => ({ 
  type: AssetActionTypes.FETCH_ASSET_BREAKDOWN_START,
  payload: memberId,
});
