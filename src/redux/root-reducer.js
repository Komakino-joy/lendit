import { combineReducers } from "redux";

import storage from 'redux-persist/lib/storage';

import { persistReducer } from "redux-persist";

import assetData from './asset/asset-reducer'
import userData from './user/user-reducer'
import dropDownOptions from './drop-downs/drop-downs.reducer'
import modalState from "./modal/modal.reducer";
import memberState  from "./site-member/site-member.reducer";


const persistConfig = {
    key: 'root', 
    blacklist: ['userData'],
    storage
};

const appReducer = combineReducers({
    assetData,
    userData,
    modalState,
    dropDownOptions, 
    memberState
  })
  
  const rootReducer = (state, action) => {
    if (action.type === 'HANDLE_MEMBER_SIGN_OUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }

export default persistReducer(persistConfig, rootReducer);