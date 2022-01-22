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
    seenActivityReport: false,
    seenEmailDistroReport: false,
    seenAddEmailToDistro: false,
    seenManageUsersModal: false,
    seenManageAssetsModal: false,
    emailDistro: [],
    error: null,
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  const modalState = (state = INITIAL_STATE  , action ) => {


    switch (action.type) {
      
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

      case ModalActionTypes.TOGGLE_DISTRO_REPORT:
        return {
          ...state,
          seenEmailDistroReport: !state.seenEmailDistroReport
        };

      case ModalActionTypes.TOGGLE_ADD_EMAIL_TO_DISTRO:
         return {
           ...state,
           seenAddEmailToDistro: !state.seenAddEmailToDistro
         }

      case ModalActionTypes.TOGGLE_MANAGE_USERS_MODAL:
        return {
          ...state,
          seenManageUsersModal: !state.seenManageUsersModal
        }

      case ModalActionTypes.TOGGLE_MANAGE_ASSETS_MODAL:
        return {
          ...state,
          seenManageAssetsModal: !state.seenManageAssetsModal
        }
  
      case ModalActionTypes.FETCH_EMAIL_DISTRO_SUCCESS:
        return {
          ...state,
          emailDistro: action.payload,
          error: null,
        }

      case ModalActionTypes.ADD_EMAIL_TO_DISTRO_SUCCESS: 
        return {
          ...state,
          emailDistro: action.payload,
        }

      case ModalActionTypes.DELETE_EMAIL_FROM_DISTRO_SUCCESS: 
        return {
          ...state,
          emailDistro: action.payload,
        }

        case ModalActionTypes.FETCH_EMAIL_DISTRO_FAILURE:
        case ModalActionTypes.ADD_EMAIL_TO_DISTRO_FAILURE:
        case ModalActionTypes.DELETE_EMAIL_FROM_DISTRO_FAILURE:
          return {
            ...state,
            error: action.payload,
          }


      default:
        return state;
    }
  };
  
  export default modalState; 