import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { persistStore } from "redux-persist";
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]

// middlewares.push(logger);

export const store = createStore(
    rootReducer,composeWithDevTools( 
    applyMiddleware(...middlewares),
    ));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);