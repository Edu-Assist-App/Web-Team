import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { learningPathsApi } from "../../lib/redux/api/learningPathApi";
import authReducer from "./features/authSlice";
import learningPathsReducer from "../../lib/redux/features/learningPathSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [learningPathsApi.reducerPath]: learningPathsApi.reducer,
    auth: authReducer,
    learningPaths: learningPathsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      learningPathsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
