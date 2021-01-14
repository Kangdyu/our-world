import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeLatest } from 'redux-saga/effects';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearchTerm: {
      reducer: (state, action: PayloadAction<string>) => {
        state = action.payload;
        return state;
      },
      prepare: (term: string) => {
        return { payload: term };
      },
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

export const setSearchTermAsync = createAction<string>(
  'search/setSearchTermAsync'
);

function* handleInputSaga(action: PayloadAction<string>) {
  yield delay(500);
  yield put(setSearchTerm(action.payload));
}

export function* searchSaga() {
  yield takeLatest(setSearchTermAsync, handleInputSaga);
}
