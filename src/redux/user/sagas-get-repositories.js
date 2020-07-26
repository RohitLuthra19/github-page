import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import * as types from './types';
import * as constants from '../constants';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getRepositoriesWatcherSaga() {
  yield takeLatest(types.GET_REPOSITORIES_REQUEST, workerSaga);
}

export function fetchData(baseUrl) {
  const url = `${baseUrl}/repos`;

  return axios.get(url)
    .then(val => val)
    .catch(err => console.log('get repos error: ', err))
}

// worker saga: makes the api call when watcher saga sees the action
export function* workerSaga() {
  try {
    const {status, data}  = yield call(fetchData, constants.BASE_URL);

    if (status === 200 ) {
      yield put({ type: types.GET_REPOSITORIES_SUCCESS, data });
    } else {
      yield put({ type: types.GET_REPOSITORIES_FAILURE, error: true });
    }

  } catch (error) {
    yield put({ type: types.GET_REPOSITORIES_FAILURE, error: true });
  }
}
