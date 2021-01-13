import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { fetchCountryList } from '../api';
import { ICountryInfo } from '../api/types';
import { AxiosResponse } from 'axios';

export const getCountryList = createAction('countries/getCountryList');
const getCountryListSuccess = createAction<ICountryInfo[]>(
  'countries/getCountryListSuccess'
);
const getCountryListError = createAction<string>(
  'countries/getCountryListError'
);

function* getCountryListSaga() {
  try {
    const { data: countries }: AxiosResponse<ICountryInfo[]> = yield call(
      fetchCountryList
    );
    yield put(getCountryListSuccess(countries));
  } catch (error) {
    yield put(getCountryListError(error));
  }
}

export function* countriesSaga() {
  yield takeEvery(getCountryList.type, getCountryListSaga);
}

export interface ICountriesState {
  isLoading: boolean;
  error: string | null;
  data: ICountryInfo[] | null;
}

const initialState: ICountriesState = {
  isLoading: false,
  error: null,
  data: null,
};

export const countriesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCountryList, (state) => ({
      ...state,
      isLoading: true,
    }))
    .addCase(getCountryListSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }))
    .addCase(getCountryListError, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }));
});
