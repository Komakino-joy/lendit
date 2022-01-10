import ModalActionTypes from "./modal.types";  
  
  const INITIAL_STATE = {
    seenAvailableAssets: false,
    seenAssetsInUse:false,
    seenMultipleUnitsInUse: false,
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
      
      case ModalActionTypes.TOGGLE_AVAILABLE_UNITS:
        return {
          ...state,
          seenAvailableAssets: !state.seenAvailableAssets
        };

      case ModalActionTypes.TOGGLE_UNITS_IN_USE:
        return {
          ...state,
          seenAssetsInUse: !state.seenAssetsInUse
        };

      case ModalActionTypes.TOGGLE_MULTIPLE_UNITS_IN_USE:
        return {
          ...state,
          seenMultipleUnitsInUse: !state.seenMultipleUnitsInUse
        };

      case ModalActionTypes.TOGGLE_QUARANTINED_UNITS:
        return {
          ...state,
          seenQuarantinedAssets: !state.seenQuarantinedAssets
        };

      case ModalActionTypes.TOGGLE_ADD_USER:
        return {
          ...state,
          seenAddUser: !state.seenAddUser
        };

      case ModalActionTypes.TOGGLE_ADD_UNIT:
        return {
          ...state,
          seenAddAsset: !state.seenAddAsset
        };

      case ModalActionTypes.TOGGLE_ADD_MODEL:
        return {
          ...state,
          seenAddModel: !state.seenAddModel
        };

      case ModalActionTypes.TOGGLE_ACTIVITY_TRACKING:
        return {
          ...state,
          seenActivityParameters: !state.seenActivityParameters
        };

        case ModalActionTypes.TOGGLE_ACTIVITY_REPORT:
          return {
            ...state,
            seenActivityReport: !state.seenActivityReport
          };
  
      default:
        return state;
    }
  };
  
  export default modalState; 