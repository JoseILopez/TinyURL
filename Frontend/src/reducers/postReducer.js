// POST async

const REDIRECT_URL = 'http://localhost:5000/';

function postPending(state) {
  return {
    hasSubmitted: true,
    submitURL: '',
    submitText: 'Generating ShortURL...',
    shortURLs: state.shortURLs,
  };
}

function postEnd(state, action) {
  return {
    hasSubmitted: true,
    submitURL: `${action.url}`,
    submitText: `${REDIRECT_URL}${action.shortName}`,
    shortURLs: state.shortURLs,
  };
}

function postFail(state, action) {
  return {
    hasSubmitted: false,
    submitURL: '',
    submitText: String(action.err),
    shortURLs: state.shortURLs,
  };
}


export { postPending, postEnd, postFail };
