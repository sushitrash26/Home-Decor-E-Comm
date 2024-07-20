import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice.js";
import userSlice from "./user.slice.js";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig ={
  key: "root",
  version: 1,
  storage
}

const reducer  = combineReducers({
  cart: cartSlice,
  user: userSlice,
})


const persistedReducer = persistReducer(persistConfig,reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  }),

});

export default store;