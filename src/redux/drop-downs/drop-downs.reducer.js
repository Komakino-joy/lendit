
import DropDownActionTypes from "./drop-down.types";
  
  const INITIAL_STATE = {
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  const dropDownOptions = (state = INITIAL_STATE  , { type, assetDropDown, userDropDown, modelDropDown }) => {
    switch (type) {
      case DropDownActionTypes.RECEIVE_ASSET_DROP_DOWN_OPTIONS:
        return {...state,assetDropDown}
      case DropDownActionTypes.RECEIVE_USER_DROP_DOWN_OPTIONS:
        return {...state,userDropDown}
      case DropDownActionTypes.RECEIVE_MODEL_DROP_DOWN_OPTIONS:
        return {...state,modelDropDown}
      default:
        return state;
    }
  };
  
  export default dropDownOptions; 