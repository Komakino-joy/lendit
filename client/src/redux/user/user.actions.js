import UserActionTypes  from './user.types'

export const addNewUserStart = (userDetails) => ({
  type: UserActionTypes.ADD_NEW_USER_START,
  payload: userDetails,
});

export const addNewUserSuccess = (response) => ({
  type: UserActionTypes.ADD_NEW_USER_SUCCESS,
  payload: response,
});

export const addNewUserFailure = (error) => ({
  type: UserActionTypes.ADD_NEW_USER_FAILURE,
  payload: error,
});