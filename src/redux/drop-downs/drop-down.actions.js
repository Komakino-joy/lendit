export const REQUEST_ASSET_DROP_DOWN_OPTIONS = "REQUEST_ASSET_DROP_DOWN_OPTIONS";
export const RECEIVE_ASSET_DROP_DOWN_OPTIONS = "RECEIVE_ASSET_DROP_DOWN_OPTIONS";
export const REQUEST_USER_DROP_DOWN_OPTIONS = "REQUEST_USER_DROP_DOWN_OPTIONS";
export const RECEIVE_USER_DROP_DOWN_OPTIONS = "RECEIVE_USER_DROP_DOWN_OPTIONS";
export const REQUEST_MODEL_DROP_DOWN_OPTIONS = "REQUEST_MODEL_DROP_DOWN_OPTIONS";
export const RECEIVE_MODEL_DROP_DOWN_OPTIONS = "RECEIVE_MODEL_DROP_DOWN_OPTIONS";


export const requestAssetDropDownOptions = (memberId) => ({ 
    type: REQUEST_ASSET_DROP_DOWN_OPTIONS, 
    payload: memberId
}); 

export const receiveAssetDropDownOptions = (assetDropDown) => ({
     type: RECEIVE_ASSET_DROP_DOWN_OPTIONS, assetDropDown
});

export const requestUserDropDownOptions = (memberId) => ({ 
    type: REQUEST_USER_DROP_DOWN_OPTIONS, 
    payload: memberId
}); 

export const receiveUserDropDownOptions = (userDropDown) => ({
     type: RECEIVE_USER_DROP_DOWN_OPTIONS, userDropDown
});

export const requestModelDropDownOptions = (memberId) => ({ 
    type: REQUEST_MODEL_DROP_DOWN_OPTIONS,
    payload: memberId
}); 

export const receiveModelDropDownOptions = (modelDropDown) => ({
     type: RECEIVE_MODEL_DROP_DOWN_OPTIONS, modelDropDown
});
