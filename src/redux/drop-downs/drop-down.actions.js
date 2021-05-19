import DropDownActionTypes from './drop-down.types';

export const requestAssetDropDownOptions = (memberId) => ({ 
    type: DropDownActionTypes.REQUEST_ASSET_DROP_DOWN_OPTIONS, 
    payload: memberId
}); 

export const receiveAssetDropDownOptions = (assetDropDown) => ({
     type: DropDownActionTypes.RECEIVE_ASSET_DROP_DOWN_OPTIONS, 
     payload: assetDropDown
});

export const requestUserDropDownOptions = (memberId) => ({ 
    type: DropDownActionTypes.REQUEST_USER_DROP_DOWN_OPTIONS, 
    payload: memberId
}); 

export const receiveUserDropDownOptions = (userDropDown) => ({
     type: DropDownActionTypes.RECEIVE_USER_DROP_DOWN_OPTIONS, 
     payload: userDropDown
});

export const requestModelDropDownOptions = (memberId) => ({ 
    type: DropDownActionTypes.REQUEST_MODEL_DROP_DOWN_OPTIONS,
    payload: memberId
}); 

export const receiveModelDropDownOptions = (modelDropDown) => ({
     type: DropDownActionTypes.RECEIVE_MODEL_DROP_DOWN_OPTIONS, 
     payload: modelDropDown
});
