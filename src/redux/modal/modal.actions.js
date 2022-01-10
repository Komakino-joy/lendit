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