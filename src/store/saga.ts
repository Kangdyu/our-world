import { all } from 'redux-saga/effects';
import { countriesSaga } from './countriesSlice';
import { searchSaga } from './searchSlice';

function* rootSaga() {
  yield all([countriesSaga(), searchSaga()]);
}

export default rootSaga;
