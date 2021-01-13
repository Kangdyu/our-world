import { all } from 'redux-saga/effects';
import { countriesSaga } from './countriesSlice';

function* rootSaga() {
  yield all([countriesSaga()]);
}

export default rootSaga;
