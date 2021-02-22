import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';


import { persistStore } from "redux-persist";
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger]

// if (process.NODE_ENV === 'development') {
//     middlewares.push(logger);
// };

export const store = createStore(
    rootReducer,composeWithDevTools( 
    applyMiddleware(...middlewares),
    ));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);