import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import loadingReducer from '../features/loadingSlice';
import indicatorReducer from '../features/indicatorSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    indicator: indicatorReducer
  },
});
