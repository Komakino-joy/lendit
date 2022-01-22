import { combineReducers } from "redux";

import storage from 'redux-persist/lib/storage';

import { persistReducer } from "redux-persist";

import dropDownOptions from './drop-downs/drop-downs.reducer'
import modalState from "./modal/modal.reducer";
import memberState  from "./site-member/site-member.reducer";


const persistConfig = {
    key: 'root', 
    blacklist: ['dropDownOptions'],
    storage
};

// const selectedOptionConfig = {
//   key: 'dropDownOptions',
//   storage,
//   blacklist: ['selectedUser', 'userDropDown', 'selected']
//   };

const appReducer = combineReducers({
    modalState,
    // dropDownOptions: persistReducer(selectedOptionConfig, dropDownOptions), 
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