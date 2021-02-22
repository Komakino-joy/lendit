import { 
  TOGGLE_AVAILABLE_UNITS,
  TOGGLE_QUARANTINED_UNITS ,
  TOGGLE_UNITS_IN_USE,
  TOGGLE_ADD_USER,
  TOGGLE_ADD_UNIT,
  TOGGLE_ADD_MODEL,
  TOGGLE_ACTIVITY_TRACKING,
  TOGGLE_ACTIVITY_REPORT
} from "./modal.actions";  
  
  const INITIAL_STATE = {
    seenAvailableAssets: false,
    seenAssetsInUse:false,
    seenQuarantinedAssets : false,
    seenAddUser: false,
    seenAddAsset: false,
    seenAddModel: false,
    seenActivityParameters: false,
    seenActivityReport: false
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  const modalState = (state = INITIAL_STATE  , { type }) => {
    switch (type) {
      
      case TOGGLE_AVAILABLE_UNITS:
        return {
          ...state,
          seenAvailableAssets: !state.seenAvailableAssets
        };

      case TOGGLE_UNITS_IN_USE:
        return {
          ...state,
          seenAssetsInUse: !state.seenAssetsInUse
        };

      case TOGGLE_QUARANTINED_UNITS:
        return {
          ...state,
          seenQuarantinedAssets: !state.seenQuarantinedAssets
        };

      case TOGGLE_ADD_USER:
        return {
          ...state,
          seenAddUser: !state.seenAddUser
        };

      case TOGGLE_ADD_UNIT:
        return {
          ...state,
          seenAddAsset: !state.seenAddAsset
        };

      case TOGGLE_ADD_MODEL:
        return {
          ...state,
          seenAddModel: !state.seenAddModel
        };

      case TOGGLE_ACTIVITY_TRACKING:
        return {
          ...state,
          seenActivityParameters: !state.seenActivityParameters
        };

        case TOGGLE_ACTIVITY_REPORT:
          return {
            ...state,
            seenActivityReport: !state.seenActivityReport
          };
  
      default:
        return state;
    }
  };
  
  export default modalState; 