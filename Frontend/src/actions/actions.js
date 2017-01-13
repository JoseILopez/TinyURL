/*
**  Action creators
*/

// TYPES

export const POST_START = 'POST_START';
export const POST_PENDING = 'POST_PENDING';
export const POST_END = 'POST_END';
export const POST_FAIL = 'POST_FAIL';

export const GET_ALL_START = 'GET_ALL_START';
export const GET_ALL_END = 'GET_ALL_END';
export const GET_ALL_FAIL = 'GET_ALL_FAIL';

export const SHORTURL_HIDE = 'SHORTURL_HIDE';

export const RELOAD_PAGE = 'RELOAD_PAGE';

// Creators

// POST

export function postStart(shortName, url) {
  return {
    type: POST_START,
    shortName,
    url,
  };
}

export function postPending(shortName, url) {
  return {
    type: POST_PENDING,
  };
}

export function postEnd(shortName, url) {
  return {
    type: POST_END,
    shortName,
    url,
  };
}

export function postFail(err) {
  return {
    type: POST_FAIL,
    err,
  };
}

// GET

export function getAllStart() {
  return {
    type: GET_ALL_START,
  };
}

export function getAllEnd(shortURLs) {
  return {
    type: GET_ALL_END,
    shortURLs,
  }
}

export function getAllFail(err) {
  return {
    type: GET_ALL_FAIL,
    err,
  }
}

// Hide ShortURL list

export function shortURLHide() {
  return {
    type: SHORTURL_HIDE,
  }
};

// Reload

export function reloadPage() {
  return {
    type: RELOAD_PAGE,
  };
}
