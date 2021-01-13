import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import { countriesReducer } from './countriesSlice';
import { sortReducer } from './sortSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}
