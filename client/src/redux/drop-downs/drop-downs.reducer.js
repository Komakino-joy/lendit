
import DropDownActionTypes from "./drop-down.types";
import AssetActionTypes from "../asset/asset.types";
import ModalActionTypes from "../modal/modal.types";
import UserActionTypes  from "../user/user.types";

import { calculateTotals, updateDropDownObject } from "./drop-down.utils";
  
  const INITIAL_STATE = {
    assetDropDown: [],
    userDropDown: [],
    modelDropDown: [],
    assetBreakdown: {
      assetsInUse: 0,
      availableAssets: 0,
      quarantineAssets: 0
    },
    error: null,
    selectedUser: {
      id: null,
      fname: null,
      lname: null,
    },
    selectedAsset: {
      comments: null,
      id: null,
      image: null,
      in_use_by: null,
      last_checkout: null,
      model: null,
      name: null,
      owner_id: 56,
      serial: null,
      status: null,
    },

  };
  
  // eslint-disable-next-line import/no-anonymous-default-export
  const dropDownOptions = (state = INITIAL_STATE  , action) => {
    switch (action.type) {

      case DropDownActionTypes.FETCH_ASSET_DROP_DOWN_OPTIONS_SUCCESS:
        return {
          ...state,
          assetDropDown: action.payload,
          assetBreakdown: calculateTotals(action.payload),
          error : null,
        }

      case AssetActionTypes.FETCH_SELECTED_ASSET_SUCCESS: 
        return {
            ...state,
            selectedAsset: action.payload,
        }

      case DropDownActionTypes.FETCH_USER_DROP_DOWN_OPTIONS_SUCCESS:
        return {
          ...state,
          userDropDown: action.payload,
          error : null,
        }

      case DropDownActionTypes.SET_SELECTED_USER: 
        return {
            ...state,
            selectedUser: action.payload
        }

      case DropDownActionTypes.FETCH_MODEL_DROP_DOWN_OPTIONS_SUCCESS:
        return {
          ...state,
          modelDropDown: action.payload,
          error : null,
        }
        
      case AssetActionTypes.CHECK_OUT_SELECTED_ASSET_SUCCESS:
        return {
          ...state,
          assetDropDown: updateDropDownObject(state.assetDropDown, action.payload.selectedAsset.id, action.payload.selectedAsset),
          selectedAsset: action.payload.selectedAsset,
          assetBreakdown: calculateTotals(state.assetDropDown),
          error : null,
        }

      case AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS:
        return {
          ...state,
          assetDropDown: updateDropDownObject(state.assetDropDown, action.payload.selectedAsset.id, action.payload.selectedAsset),
          selectedAsset: action.payload.selectedAsset,
          assetBreakdown: calculateTotals(state.assetDropDown),
          error : null,
        };

      case AssetActionTypes.QUARANTINE_SELECTED_ASSET_SUCCESS:
        return {
          ...state,
          assetDropDown: updateDropDownObject(state.assetDropDown, action.payload.selectedAsset.id, action.payload.selectedAsset),
          selectedAsset: action.payload.selectedAsset,
          assetBreakdown: calculateTotals(state.assetDropDown),
          error : null,
        }

      case AssetActionTypes.FETCH_ASSET_BREAKDOWN_SUCCESS:
        return {
          ...state,
          assetBreakdown: action.payload,
          error: null
        }
      
      case UserActionTypes.ADD_NEW_USER_SUCCESS:
          return {
            ...state,
            userDropDown: [ ...state.userDropDown, action.payload ],
            error: null,
          }

      case ModalActionTypes.DELETE_USER_SUCCESS:
        return {
          ...state,
          userDropDown: state.userDropDown.filter(asset => asset.id !== action.payload),
          error: null,
        }
      
      case AssetActionTypes.ADD_NEW_ASSET_SUCCESS: 
        return {
          ...state,
          assetDropDown: [ ...state.assetDropDown, action.payload ],
          assetBreakdown: calculateTotals([ ...state.assetDropDown, action.payload ]),
          error : null,
        }

      case AssetActionTypes.REMOVE_SELECTED_ASSET_SUCCESS:
        return {
          ...state,
          assetDropDown: state.assetDropDown.filter(asset => asset.id !== action.payload),
          selectedAsset: {
            comments: null,
            id: null,
            image: null,
            in_use_by: null,
            last_checkout: null,
            model: null,
            name: null,
            owner_id: 56,
            serial: null,
            status: null,
          },
          assetBreakdown: calculateTotals(state.assetDropDown.filter(asset => asset.id !== action.payload)),
          error : null,
        }
      
      case DropDownActionTypes.FETCH_ASSET_DROP_DOWN_OPTIONS_FAILURE:
      case DropDownActionTypes.FETCH_USER_DROP_DOWN_OPTIONS_FAILURE:
      case DropDownActionTypes.FETCH_MODEL_DROP_DOWN_OPTIONS_FAILURE:
      case DropDownActionTypes.CHECK_IN_SELECTED_ASSET_FAILURE:
      case DropDownActionTypes.CHECK_OUT_SELECTED_ASSET_FAILURE:
      case DropDownActionTypes.QUARANTINE_SELECTED_ASSET_FAILURE:
      case AssetActionTypes.REMOVE_SELECTED_ASSET_FAILURE:
      case AssetActionTypes.FETCH_SELECTED_ASSET_FAILURE:
      case AssetActionTypes.FETCH_ASSET_BREAKDOWN_FAILURE:
      case UserActionTypes.ADD_NEW_USER_FAILURE:
      case ModalActionTypes.DELETE_USER_FAILURE:
      case AssetActionTypes.ADD_NEW_ASSET_FAILURE:
        
        return {
          ...state,
          error: action.payload
        }

      default:
        return state;
    }
  };
  
  export default dropDownOptions; 