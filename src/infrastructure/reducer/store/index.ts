import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import * as reducers from '@/infrastructure/reducer/slices';

const IS_PRODUCTION = () => {
  return process.env.NODE_ENV === 'production';
};

const store = configureStore({
  reducer: reducers,
  devTools: !IS_PRODUCTION(),
  middleware: (getDefaultMiddleware) =>
    IS_PRODUCTION()
      ? getDefaultMiddleware()
      : getDefaultMiddleware().concat(logger)
});

export default store;
