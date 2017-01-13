/*
**  POST Async event handling
*/

import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { POST_START, postPending, postEnd, postFail } from '../actions/actions';

const SERVER_URL = 'http://localhost:5000/api/shortURLs';

// Handles POST_START event

function* postSaga() {
  yield* takeLatest(POST_START, submitForm);
}

// Submits data and waits for response

function* submitForm(action) {
  try {
    yield put(postPending());
    const data = yield call(postRequest, action.shortName, action.url);
    yield put(postEnd(data.shortName, data.url));
  } catch (err) {
    yield put(postFail(err));
  }
}

// Sends POST request using arguments as the body params

function postRequest(shortName, url) {
    const body = {
      shortName,
      url,
    };

    let request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    return fetch(SERVER_URL, request)
           .then(res => res.json());
}


export default postSaga;
