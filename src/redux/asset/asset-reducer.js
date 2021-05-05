import { 
  RECEIVE_SELECTED_ASSET
} from "./asset.actions";

const INITIAL_STATE = {}

// eslint-disable-next-line import/no-anonymous-default-export
const assetData = (state = INITIAL_STATE  , { type, assetData }) => {
  switch (type) {
    case RECEIVE_SELECTED_ASSET:
      if(assetData === undefined){
        return state;
      };
      return assetData;
    default:
      return state;
  }
};

export default assetData; 