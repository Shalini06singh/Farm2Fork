import {
    configureStore
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import {
    RootReducer
} from "../reducers/root.reducer";
import {
    root
} from "../sagas/root.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: RootReducer,
    middleware: (middleware) => middleware({
        serializableCheck: false
    }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production' ? true : false
})

sagaMiddleware.run(root)