export const REQUEST_SELECTED_ASSET = "REQUEST_SELECTED_ASSET";
export const RECEIVE_SELECTED_ASSET = "RECEIVE_SELECTED_ASSET";
export const CHECK_IN_SELECTED_ASSET_START = "CHECK_IN_SELECTED_ASSET_START";
export const CHECK_IN_SELECTED_ASSET_SUCCESS = "CHECK_IN_SELECTED_ASSET_SUCCESS";
export const CHECK_OUT_SELECTED_ASSET_START = "CHECK_OUT_SELECTED_ASSET_START";
export const CHECK_OUT_SELECTED_ASSET_SUCCESS = "CHECK_OUT_SELECTED_ASSET_SUCCESS";
export const QUARANTINE_SELECTED_ASSET_START = "QUARANTINE_SELECTED_ASSET_START";
export const QUARANTINE_SELECTED_ASSET_SUCCESS = "QUARANTINE_SELECTED_ASSET_SUCCESS";

export const requestSelectedAssetData = (assetID, ownerID) => ({ 
    type: REQUEST_SELECTED_ASSET, assetID, ownerID
});

export const receiveSelectedAssetData = (assetData, ownerID) => ({
     type: RECEIVE_SELECTED_ASSET, assetData, ownerID
});

export const checkInSelectedAssetStart = (assetID, ownerId, assetName, assetSerial, assetModel ) => ({
    type: CHECK_IN_SELECTED_ASSET_START, assetID, ownerId, assetName, assetSerial, assetModel
});

export const checkInSelectedAssetSuccess = (assetData) => ({
    type: CHECK_IN_SELECTED_ASSET_SUCCESS, assetData
});

export const checkOutSelectedAssetStart = (assetID, userID, ownerId, assetName, assetSerial, assetModel) => ({
    type: CHECK_OUT_SELECTED_ASSET_START, assetID, userID, ownerId, assetName, assetSerial, assetModel
});

export const checkOutSelectedAssetSuccess = (assetData) => ({
    type: CHECK_OUT_SELECTED_ASSET_SUCCESS, assetData
});

export const quarantineSelectedAssetStart = (assetID, userID, ownerId, assetName, assetSerial, assetModel, comment) => ({
    type: QUARANTINE_SELECTED_ASSET_START, assetID, userID, ownerId, assetName, assetSerial, assetModel, comment
});

export const quarantineSelectedAssetSuccess = (assetData) => ({
    type: QUARANTINE_SELECTED_ASSET_SUCCESS, assetData
});