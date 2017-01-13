// GET async

function getAllEnd(state, action) {
  let newState = Object.assign({}, state);
  newState.shortURLs = action.shortURLs.slice();

  return newState;
}

function getAllFail(state, action) {
  let newState = Object.assign({}, state);
  newState.shortURLs = [];
  newState.submitText = String(action.err);

  return newState;
}


export { getAllEnd, getAllFail };
