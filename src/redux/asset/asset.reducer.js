import AssetActionTypes from "./asset.types";

const INITIAL_STATE = {
  comments: null,
  id: null,
  image: null,
  last_checkout: null,
  model: null,
  name: null,
  owner_id: null,
  serial: null,
  status: null,
  error : null,
}

const assetData = (state = INITIAL_STATE  , action) => {
  switch (action.type) {
    case AssetActionTypes.REQUEST_SELECTED_ASSET_SUCCESS:
      if(action.payload === undefined){
        return state;
      }
      return {
        ...state,
        comments: action.payload.comments,
        id: action.payload.id,
        image: action.payload.image,
        last_checkout: action.payload.last_checkout,
        model: action.payload.model,
        name: action.payload.name,
        owner_id: action.payload.owner_id,
        serial: action.payload.serial,
        status: action.payload.status,
        error : null,
      };

    case AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS:
    return {
      ...state,
      id: action.payload.id,
      model: action.payload.model,
      name: action.payload.name,
      owner_id: action.payload.owner_id,
      serial: action.payload.serial,
      status: 'Available',
      comments: null,
      error : null,
    };

    case AssetActionTypes.CHECK_OUT_SELECTED_ASSET_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        model: action.payload.model,
        name: action.payload.name,
        owner_id: action.payload.owner_id,
        serial: action.payload.serial,
        status: 'In Use By ' + action.payload.userId,
        comments: null,
        error : null,
      }

      case AssetActionTypes.QUARANTINE_SELECTED_ASSET_SUCCESS:
        return {
          ...state,
          id: action.payload.id,
          model: action.payload.model,
          name: action.payload.name,
          owner_id: action.payload.owner_id,
          serial: action.payload.serial,
          status: 'Quarantine',
          comments: action.payload.assetComments,
          error : null,
        }

      case AssetActionTypes.REMOVE_SELECTED_ASSET_SUCCESS:
        return {
          ...state,
          id: null,
          error : null,
        }
    case AssetActionTypes.REQUEST_SELECTED_ASSET_FAILURE:
    case AssetActionTypes.CHECK_IN_SELECTED_ASSET_FAILURE:
    case AssetActionTypes.CHECK_OUT_SELECTED_ASSET_FAILURE:
    case AssetActionTypes.QUARANTINE_SELECTED_ASSET_FAILURE:
    case AssetActionTypes.REMOVE_SELECTED_ASSET_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  }
};

export default assetData; 