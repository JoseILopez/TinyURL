/*
**  SAGAS
**  These take care of all async dispatches
*/

import postSaga from './postSaga';
import getAllSaga from './getSaga';

// Gather sagas into one root saga

export default function* rootSaga() {
  yield [postSaga(), getAllSaga()];
}
