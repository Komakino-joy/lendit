import UserActionTypes from './user.types';

export const requestSelectedUserData = (userID) => ({
    type: UserActionTypes.REQUEST_SELECTED_USER, userID
});

export const receiveSelectedUserData = (userData) => ({
    type: UserActionTypes.RECEIVE_SELECTED_USER, userData
});
