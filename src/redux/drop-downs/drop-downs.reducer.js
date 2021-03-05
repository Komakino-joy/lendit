
import { 
    RECEIVE_ASSET_DROP_DOWN_OPTIONS,
    RECEIVE_USER_DROP_DOWN_OPTIONS, 
    RECEIVE_MODEL_DROP_DOWN_OPTIONS
  } from "./drop-down.actions";
  
  const INITIAL_STATE = {
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  const dropDownOptions = (state = INITIAL_STATE  , { type, assetDropDown, userDropDown, modelDropDown }) => {
    switch (type) {
      case RECEIVE_ASSET_DROP_DOWN_OPTIONS:
        return {...state,assetDropDown}
      case RECEIVE_USER_DROP_DOWN_OPTIONS:
        return {...state,userDropDown}
      case RECEIVE_MODEL_DROP_DOWN_OPTIONS:
        return {...state,modelDropDown}
      default:
        return state;
    }
  };
  
  export default dropDownOptions; 