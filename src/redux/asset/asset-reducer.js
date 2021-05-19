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
    case AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS:
    case AssetActionTypes.RECEIVE_SELECTED_ASSET:
      console.log( 'I HAVE BEEN USED FOR THE FIRST TIME !!!!', action)
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
    // case AssetActionTypes.CHECK_IN_SELECTED_ASSET_SUCCESS:
    //   console.log( 'I HAVE BEEN USED FOR THE FIRST TIME !!!!', action)
    //   console.log(action)
    // return {
    //   ...state,
    //   comments: action.payload.comments,
    //   id: action.payload.id,
    //   image: action.payload.image,
    //   last_checkout: action.payload.last_checkout,
    //   model: action.payload.model,
    //   name: action.payload.name,
    //   owner_id: action.payload.owner_id,
    //   serial: action.payload.serial,
    //   status: action.payload.status,
    // }
    default:
      return state;
  }
};

export default assetData; 