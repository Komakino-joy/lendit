const ModalActionTypes = {
    TOGGLE_AVAILABLE_UNITS : 'TOGGLE_AVAILABLE_UNITS',
    TOGGLE_QUARANTINED_UNITS : 'TOGGLE_QUARANTINED_UNITS',
    TOGGLE_UNITS_IN_USE : 'TOGGLE_UNITS_IN_USE',
    TOGGLE_MULTIPLE_UNITS_IN_USE: 'TOGGLE_MULTIPLE_UNITS_IN_USE',
    TOGGLE_ADD_USER : 'TOGGLE_ADD_USER',
    TOGGLE_ADD_UNIT : 'TOGGLE_ADD_UNIT',
    TOGGLE_ADD_MODEL : 'TOGGLE_ADD_MODEL',
    TOGGLE_ACTIVITY_TRACKING : 'TOGGLE_ACTIVITY_TRACKING',
    TOGGLE_ACTIVITY_REPORT : 'TOGGLE_ACTIVITY_REPORT',
    TOGGLE_DISTRO_REPORT: 'TOGGLE_DISTRO_REPORT',
    TOGGLE_ADD_EMAIL_TO_DISTRO: 'TOGGLE_ADD_EMAIL_TO_DISTRO',
    TOGGLE_MANAGE_USERS_MODAL: 'TOGGLE_MANAGE_USERS_MODAL',
    FETCH_EMAIL_DISTRO_START: 'FETCH_EMAIL_DISTRO_START',
    FETCH_EMAIL_DISTRO_SUCCESS: 'FETCH_EMAIL_DISTRO_SUCCESS',
    FETCH_EMAIL_DISTRO_FAILURE: 'FETCH_EMAIL_DISTRO_FAILURE',
    DELETE_EMAIL_FROM_DISTRO_START: 'DELETE_EMAIL_FROM_DISTRO_START',
    DELETE_EMAIL_FROM_DISTRO_SUCCESS: 'DELETE_EMAIL_FROM_DISTRO_SUCCESS',
    DELETE_EMAIL_FROM_DISTRO_FAILURE: 'DELETE_EMAIL_FROM_DISTRO_FAILURE',
    ADD_EMAIL_TO_DISTRO_START: 'ADD_EMAIL_TO_DISTRO_START',
    ADD_EMAIL_TO_DISTRO_SUCCESS: 'ADD_EMAIL_TO_DISTRO_SUCCESS',
    ADD_EMAIL_TO_DISTRO_FAILURE: 'ADD_EMAIL_TO_DISTRO_FAILURE',
    DELETE_USER_START: 'DELETE_USER_START',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',
    TOGGLE_MANAGE_ASSETS_MODAL: 'TOGGLE_MANAGE_ASSETS_MODAL',
};

export default ModalActionTypes;