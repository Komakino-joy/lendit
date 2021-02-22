import { createSelector } from "reselect";

const selectMemberId = state => state.memberState;

export const isSignedIn = createSelector(
    [selectMemberId],
    ( memberState ) => memberState.memberSignedIn
);

export const currentMemberId = createSelector(
    [selectMemberId],
    ( memberState ) => memberState.memberId
);