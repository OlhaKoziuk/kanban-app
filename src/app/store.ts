import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import repoInfoReducer from '../features/repoInfoSlice';

export const store = configureStore({
  reducer: {
    repoInfo: repoInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

