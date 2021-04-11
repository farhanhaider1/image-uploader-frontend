import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";

// used to keep redux state on refresh
import { persistReducer } from "redux-persist";
// session storage is erased on window close
import storageSession from "redux-persist/es/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function () {
  return configureStore({
    // reducer,
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware()],
  });
}
