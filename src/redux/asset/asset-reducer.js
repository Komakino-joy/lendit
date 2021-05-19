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
}

// eslint-disable-next-line import/no-anonymous-default-export
const assetData = (state = INITIAL_STATE  , action) => {
  switch (action.type) {
    case AssetActionTypes.RECEIVE_SELECTED_ASSET:
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
      };

    case AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS:
    return {
      ...state,
      id: action.payload.id,
      model: action.payload.model,
      name: action.payload.name,
      owner_id: action.payload.owner_id,
      serial: action.payload.serial,
      status: 'Available'
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
          comments: action.payload.assetComments
        }
    default:
      return state;
  }
};

export default assetData; 