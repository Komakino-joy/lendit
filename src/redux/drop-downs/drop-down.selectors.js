import { createSelector } from "reselect";

const selectDropDown = state => state.dropDownOptions;

export const selectAssets = createSelector(
    [selectDropDown],
    ( dropDownOptions ) => dropDownOptions.assetDropDown
);

export const selectUsers = createSelector(
    [selectDropDown],
    ( dropDownOptions ) => dropDownOptions.userDropDown
);

export const selectModels = createSelector(
    [selectDropDown],
    ( dropDownOptions ) => dropDownOptions.modelDropDown
);