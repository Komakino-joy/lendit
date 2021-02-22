import { createSelector } from 'reselect';

const selectUser = state => state.userData;

export const userId = createSelector(
    [selectUser],
    ( userData ) => userData.id
);

export const userFname = createSelector(
    [selectUser],
    ( userData ) => userData.fname
);

export const userLname = createSelector(
    [selectUser],
    ( userData ) => userData.lname
);

export const userOwnerId = createSelector(
    [selectUser],
    ( userData ) => userData.owner_id
);
