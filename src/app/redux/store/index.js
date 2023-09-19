import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import sagas from "../sagas";
import rootReducer from "../reducers";

// Add name of reducers to whitelist array to persist that reducer to local storage
const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["persist"],
};

// initiate saga middleware and supply to middleware array
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(applyMiddleware(...middleware)));

// run saga middleware to watch for action dispatches
sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
