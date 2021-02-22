export const REQUEST_SELECTED_USER = "REQUEST_SELECTED_USER";
export const RECEIVE_SELECTED_USER = "RECEIVE_SELECTED_USER";
export const ADD_NEW_USER = "ADD_NEW_USER";

export const requestSelectedUserData = (userID) => ({
    type: REQUEST_SELECTED_USER, userID
});

export const receiveSelectedUserData = (userData) => ({
    type: RECEIVE_SELECTED_USER, userData
});
