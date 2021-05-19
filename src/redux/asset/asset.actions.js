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

export const checkOutSelectedAssetStart = (assetID, userID, ownerId, assetName, assetSerial, assetModel) => ({
    type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_START, assetID, userID, ownerId, assetName, assetSerial, assetModel
});

export const checkOutSelectedAssetSuccess = (assetData) => ({
    type: AssetActionTypes.CHECK_OUT_SELECTED_ASSET_SUCCESS, assetData
});

export const quarantineSelectedAssetStart = (assetID, userID, ownerId, assetName, assetSerial, assetModel, comment) => ({
    type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_START, assetID, userID, ownerId, assetName, assetSerial, assetModel, comment
});

export const quarantineSelectedAssetSuccess = (assetData) => ({
    type: AssetActionTypes.QUARANTINE_SELECTED_ASSET_SUCCESS, assetData
});