export const TOGGLE_AVAILABLE_UNITS = 'TOGGLE_AVAILABLE_UNITS';
export const TOGGLE_QUARANTINED_UNITS = 'TOGGLE_QUARANTINED_UNITS';
export const TOGGLE_UNITS_IN_USE = 'TOGGLE_UNITS_IN_USE';
export const TOGGLE_ADD_USER = 'TOGGLE_ADD_USER';
export const TOGGLE_ADD_UNIT = 'TOGGLE_ADD_UNIT';
export const TOGGLE_ADD_MODEL = 'TOGGLE_ADD_MODEL';
export const TOGGLE_ACTIVITY_TRACKING = 'TOGGLE_ACTIVITY_TRACKING';
export const TOGGLE_ACTIVITY_REPORT = 'TOGGLE_ACTIVITY_REPORT';

export const toggleAvailableUnits = () => ({
    type: TOGGLE_AVAILABLE_UNITS
});

export const toggleUnitsInUse = () => ({
    type: TOGGLE_UNITS_IN_USE
});

export const toggleQuarantinedUnits = () => ({
    type: TOGGLE_QUARANTINED_UNITS
});

export const toggleAddUser = () => ({
    type: TOGGLE_ADD_USER
});

export const toggleAddUnit = () => ({
    type: TOGGLE_ADD_UNIT
});

export const toggleAddModel = () => ({
    type: TOGGLE_ADD_MODEL
});

export const toggleActvityTracking = () => ({
    type: TOGGLE_ACTIVITY_TRACKING
});

export const toggleActvityReport = () => ({
    type: TOGGLE_ACTIVITY_REPORT
});