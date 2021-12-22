import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import conatactsReducer from "./contacts/contactsSlice";

const persistContactsConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};

const store = configureStore({
  reducer: {
    contacts: persistReducer(persistContactsConfig, conatactsReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const persistor = persistStore(store);

export { store, persistor };

//////////////////////////////////////////////

// const store = configureStore({
//   reducer: {
//     tutors: tutorsReducer,
//     cities: persistReducer(persistCitiesConfig, citiesReducer),
//     departments: () => [],
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(logger),
//   devTools: process.env.NODE_ENV !== "production",
// });
