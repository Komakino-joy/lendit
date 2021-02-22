import { createSelector } from 'reselect';

const selectAsset = state => state.assetData;

export const assetId = createSelector(
    [selectAsset],
    ( assetData ) => assetData.id
);

export const assetName = createSelector(
    [selectAsset],
    ( assetData ) => assetData.name
);

export const assetStatus = createSelector(
    [selectAsset],
    ( assetData ) => assetData.status
);

export const assetSerial = createSelector(
    [selectAsset],
    ( assetData ) => assetData.serial
);

export const assetModel = createSelector(
    [selectAsset],
    ( assetData ) => assetData.model
);

export const assetComments = createSelector(
    [selectAsset],
    ( assetData ) => assetData.comments
);

export const assetOwnerId = createSelector(
    [selectAsset],
    ( assetData ) => assetData.owner_id
);

export const assetImage = createSelector(
    [selectAsset],
    ( assetData ) => assetData.image
);
