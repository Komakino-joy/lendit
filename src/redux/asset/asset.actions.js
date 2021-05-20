import AssetActionTypes from './asset.types';

export const requestSelectedAssetData = (assetAndOwner) => ({ 
    type: AssetActionTypes.REQUEST_SELECTED_ASSET_START,
    payload: assetAndOwner,
});

export const receiveSelectedAssetData = (assetData) => ({
     type: AssetActionTypes.REQUEST_SELECTED_ASSET_SUCCESS,
     payload: assetData,
});

export const failureSelectedAssetData = (error) => ({
    type: AssetActionTypes.REQUEST_SELECTED_ASSET_FAILURE,
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

export const removeSelectedAssetSuccess = (assetData) => ({
    type: AssetActionTypes.REMOVE_SELECTED_ASSET_SUCCESS, 
    payload: assetData
});

export const removeSelectedAssetFailure = (error) => ({
    type: AssetActionTypes.REMOVE_SELECTED_ASSET_FAILURE, 
    payload: error
});