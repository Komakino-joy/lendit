import AssetActionTypes from './asset.types';

export const requestSelectedAssetData = (assetAndOwner) => ({ 
    type: AssetActionTypes.REQUEST_SELECTED_ASSET,
    payload: assetAndOwner,
});

export const receiveSelectedAssetData = (assetData) => ({
     type: AssetActionTypes.RECEIVE_SELECTED_ASSET,
     payload: assetData,
});

export const checkInSelectedAssetStart = (assetData ) => ({
    type: AssetActionTypes.CHECK_IN_SELECTED_ASSET_START,
    payload: assetData,
});

export const checkInSelectedAssetSuccess = (assetData) => ({
    type: AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS, 
    payload: assetData,
});

export const checkOutSelectedAssetStart = (assetData) => ({
    type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_START,
    payload: assetData,
});

export const checkOutSelectedAssetSuccess = (assetData) => ({
    type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_SUCCESS, 
    payload: assetData,
});

export const quarantineSelectedAssetStart = (assetData) => ({
    type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_START,
    payload: assetData,
});

export const quarantineSelectedAssetSuccess = (assetData) => ({
    type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_SUCCESS, 
    payload: assetData
});