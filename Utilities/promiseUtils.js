function PromiseUtils() {
  function Wrap(fn) {
    return new Promise(function(resolve, reject) {
      return fn();
    });
  }

  var publicAPI = {
    Wrap
  }

  return publicAPI;
}

module.exports = PromiseUtils();
