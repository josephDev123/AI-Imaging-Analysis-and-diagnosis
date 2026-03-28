import { configureStore } from "@reduxjs/toolkit";
import imagingDiagnosisReducer from "./slices/ImagingDiagnosisSlice";

export const store = configureStore({
  reducer: {
    AIDiagnosis: imagingDiagnosisReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
