import ModalActionTypes from './modal.types';

export const toggleAvailableUnits = () => ({
    type: ModalActionTypes.TOGGLE_AVAILABLE_UNITS
});

export const toggleUnitsInUse = () => ({
    type: ModalActionTypes.TOGGLE_UNITS_IN_USE
});

export const toggleMultipleUnitsInUse = () => ({
    type: ModalActionTypes.TOGGLE_MULTIPLE_UNITS_IN_USE
});

export const toggleQuarantinedUnits = () => ({
    type: ModalActionTypes.TOGGLE_QUARANTINED_UNITS
});

export const toggleAddUser = () => ({
    type: ModalActionTypes.TOGGLE_ADD_USER
});

export const toggleAddUnit = () => ({
    type: ModalActionTypes.TOGGLE_ADD_UNIT
});

export const toggleAddModel = () => ({
    type: ModalActionTypes.TOGGLE_ADD_MODEL
});

export const toggleActvityTracking = () => ({
    type: ModalActionTypes.TOGGLE_ACTIVITY_TRACKING
});

export const toggleActvityReport = () => ({
    type: ModalActionTypes.TOGGLE_ACTIVITY_REPORT
});

export const toggleEmailDistroReport = () => ({
    type: ModalActionTypes.TOGGLE_DISTRO_REPORT
});

export const toggleAddEmailToDistro = () => ({
    type: ModalActionTypes.TOGGLE_ADD_EMAIL_TO_DISTRO
});

export const toggleManageUsersModal = () => ({
    type: ModalActionTypes.TOGGLE_MANAGE_USERS_MODAL
});

export const toggleManageAssetsModal = () => ({
    type: ModalActionTypes.TOGGLE_MANAGE_ASSETS_MODAL
});

export const fetchEmailDistroStart = (memberId) => ({
    type: ModalActionTypes.FETCH_EMAIL_DISTRO_START,
    payload: memberId
});

export const fetchEmailDistroSuccess = (emailDistro) => ({
    type: ModalActionTypes.FETCH_EMAIL_DISTRO_SUCCESS,
    payload: emailDistro
});

export const fetchEmailDistroFailure = (error) => ({
    type: ModalActionTypes.FETCH_EMAIL_DISTRO_FAILURE,
    payload: error
});

export const deleteEmailFromDistroStart = (emailDetails) => ({
    type: ModalActionTypes.DELETE_EMAIL_FROM_DISTRO_START,
    payload: emailDetails,
});

export const deleteEmailFromDistroSuccess = (emailDistro) => ({
    type: ModalActionTypes.DELETE_EMAIL_FROM_DISTRO_SUCCESS,
    payload: emailDistro
});

export const deleteEmailFromDistroFailure = (error) => ({
    type: ModalActionTypes.DELETE_EMAIL_FROM_DISTRO_FAILURE,
    payload: error
});


export const deleteUserStart = (userDetails) => ({
    type: ModalActionTypes.DELETE_USER_START,
    payload: userDetails,
});

export const deleteUserSuccess = (userDetails) => ({
    type: ModalActionTypes.DELETE_USER_SUCCESS,
    payload: userDetails
});

export const deleteUserFailure = (error) => ({
    type: ModalActionTypes.DELETE_USER_FAILURE,
    payload: error
});

export const addEmailToDistroStart = (emailDetails) => ({
    type: ModalActionTypes.ADD_EMAIL_TO_DISTRO_START,
    payload: emailDetails,
});

export const addEmailToDistroSuccess = (emailDistro) => ({
    type: ModalActionTypes.ADD_EMAIL_TO_DISTRO_SUCCESS,
    payload: emailDistro
});

export const addEmailToDistroFailure = (error) => ({
    type: ModalActionTypes.ADD_EMAIL_TO_DISTRO_FAILURE,
    payload: error
});