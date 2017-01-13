/*
**  REDUCERS
**  These take care of all sync dispatches
*/

import { POST_PENDING, POST_END, POST_FAIL,
         GET_ALL_END, GET_ALL_FAIL,
         SHORTURL_HIDE, RELOAD_PAGE } from '../actions/actions';

import { postPending, postEnd, postFail } from './postReducer';
import { getAllEnd, getAllFail } from './getReducer';

// MAIN Reducer

export default function mainReducer(state, action) {
  switch(action.type) {
    case POST_PENDING:
      return postPending(state);
    case POST_END:
      return postEnd(state, action);
    case POST_FAIL:
      return postFail(state, action);
    case GET_ALL_END:
      return getAllEnd(state, action);
    case GET_ALL_FAIL:
      return getAllFail(state, action);
    case SHORTURL_HIDE:
      return shortURLHide(state);
    case RELOAD_PAGE:
      return init();
    case "@@redux/INIT":
      return init();
    default:
      return state;
  }
}

// Store initialization

function init() {
  const state = {
    hasSubmitted: false,
    submitURL: '',
    submitText: '',
    shortURLs: [],
  };

  return state;
}

// Hide ShortURLs

function shortURLHide(state) {
  let newState = Object.assign({}, state);
  newState.shortURLs = [];

  return newState;
}
