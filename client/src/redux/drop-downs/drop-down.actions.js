import DropDownActionTypes from './drop-down.types';

export const setSelectedUser = (user) => ({
    type: DropDownActionTypes.SET_SELECTED_USER,
    payload: user
});

export const fetchAssetDropDownOptionsStart = (memberId) => ({ 
    type: DropDownActionTypes.FETCH_ASSET_DROP_DOWN_OPTIONS_START, 
    payload: memberId
}); 

export const fetchAssetDropDownOptionsSuccess = (memberId) => ({ 
    type: DropDownActionTypes.FETCH_ASSET_DROP_DOWN_OPTIONS_SUCCESS, 
    payload: memberId
}); 

export const fetchAssetDropDownOptionsFailure = (error) => ({ 
    type: DropDownActionTypes.FETCH_ASSET_DROP_DOWN_OPTIONS_FAILURE, 
    payload: error
}); 

export const fetchUserDropDownOptionsStart = (memberId) => ({ 
    type: DropDownActionTypes.FETCH_USER_DROP_DOWN_OPTIONS_START, 
    payload: memberId
}); 

export const fetchUserDropDownOptionsSuccess = (memberId) => ({ 
    type: DropDownActionTypes.FETCH_USER_DROP_DOWN_OPTIONS_SUCCESS, 
    payload: memberId
}); 

export const fetchUserDropDownOptionsFailure = (error) => ({ 
    type: DropDownActionTypes.FETCH_USER_DROP_DOWN_OPTIONS_FAILURE, 
    payload: error
}); 

export const fetchModelDropDownOptionsStart = (memberId) => ({ 
    type: DropDownActionTypes.FETCH_MODEL_DROP_DOWN_OPTIONS_START, 
    payload: memberId
}); 

export const fetchModelDropDownOptionsSuccess = (memberId) => ({ 
    type: DropDownActionTypes.FETCH_MODEL_DROP_DOWN_OPTIONS_SUCCESS, 
    payload: memberId
}); 

export const fetchModelDropDownOptionsFailure = (error) => ({ 
    type: DropDownActionTypes.FETCH_MODEL_DROP_DOWN_OPTIONS_FAILURE, 
    payload: error
}); 