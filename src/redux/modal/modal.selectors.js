import { createSelector } from "reselect";

const selectModal = state => state.modalState;

export const seenActivityReport = createSelector(
    [selectModal],
    ( modalState ) => modalState.seenActivityReport
);

export const seenActivityParameters= createSelector(
    [selectModal],
    ( modalState ) => modalState.seenActivityParameters
);

export const seenAddAsset= createSelector(
    [selectModal],
    ( modalState ) => modalState.seenAddAsset
);

export const seenAddUser = createSelector(
    [selectModal],
    ( modalState ) => modalState.seenAddUser
);

export const seenAvailableAssets = createSelector(
    [selectModal],
    ( modalState ) => modalState.seenAvailableAssets
);

export const seenAssetsInUse= createSelector(
    [selectModal],
    ( modalState ) => modalState.seenAssetsInUse
);

export const seenQuarantinedAssets = createSelector(
    [selectModal],
    ( modalState ) => modalState.seenQuarantinedAssets
);

export const seenAddModel = createSelector(
    [selectModal],
    ( modalState ) => modalState.seenAddModel
);