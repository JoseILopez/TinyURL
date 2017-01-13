/*
**  GET Async event handling
*/

import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { GET_ALL_START, getAllEnd, getAllFail } from '../actions/actions';

// TODO: Put on separate API folder/file
const SERVER_URL = 'http://localhost:5000/api/shortURLs';

// Handles GET_ALL_START event

function* getAllSaga() {
  yield* takeLatest(GET_ALL_START, getAllShortURLs);
}

// Gets all shortURLs in the database

function* getAllShortURLs(action) {
  try {
    const data = yield call(getAllRequest, action.shortName, action.url);
    yield put(getAllEnd(data));
  } catch (err) {
    yield put(getAllFail(err));
  }
}

// Sends GET request with no params

function getAllRequest() {
    let request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return fetch(SERVER_URL, request)
           .then(res => res.json());
}


export default getAllSaga;
