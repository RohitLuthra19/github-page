import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as types from './types';
import * as constants from '../constants';

export function* getProfileWatcherSaga() {
    yield takeLatest(types.GET_USER_PROFILE_REQUEST, workerSaga);
}

export function fetchData(baseUrl) {
    const url =`${baseUrl}`;

    return axios.get(url, {})
        .then(val => val)
        .catch(err => console.log('get profile error', err))
}

export function* workerSaga() {
    try {
        const {status, data} = yield call(fetchData, constants.BASE_URL)
        
        if (status === 200) {
            yield put({ type: types.GET_USER_PROFILE_SUCCESS, data });
        } else {
            yield put({ type: types.GET_USER_PROFILE_FAILURE, error: true });
        }

    } catch (error) {
        yield put({ type: types.GET_USER_PROFILE_FAILURE, error });
    }
}