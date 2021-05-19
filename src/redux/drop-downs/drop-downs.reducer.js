
import DropDownActionTypes from "./drop-down.types";
  
  const INITIAL_STATE = {
    assetDropDown: [],
    userDropDown: [],
    modelDropDown: [],
  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  const dropDownOptions = (state = INITIAL_STATE  , action) => {
    switch (action.type) {
      case DropDownActionTypes.RECEIVE_ASSET_DROP_DOWN_OPTIONS:
        return {
          ...state,
          assetDropDown: action.payload
        }
      case DropDownActionTypes.RECEIVE_USER_DROP_DOWN_OPTIONS:
        return {
          ...state,
          userDropDown: action.payload
        }
      case DropDownActionTypes.RECEIVE_MODEL_DROP_DOWN_OPTIONS:
        return {
          ...state,
          modelDropDown: action.payload
        }
      default:
        return state;
    }
  };
  
  export default dropDownOptions; 