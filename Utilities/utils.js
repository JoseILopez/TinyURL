/*
**  Module with generic utility functions
*/


function Utils() {

  /* Removes protocols from URLs and www, returns an object with the
     processed URL and a boolean that indicates if it is a https or not */

  function ProcessUrl(url) {
    if (!url) {
      return '';
    }

    const protocols = ['http://', 'https://'];
    let https = false;

    let newUrl = url.replace('www.', '');

    protocols.forEach((protocol) => {
      if (newUrl.indexOf(protocol) > -1) {
        if (protocol === 'https://') {
          https = true;
        }
        newUrl = newUrl.replace(protocol, '');
      }
    });

    return { url: newUrl, https };
  }

  // Returns error catched from promise chains

  function ReturnError(err) {
    console.log(err);
  }

  // Sends a HTTP status code if if data is a code, if not it sends the data.

  function SendData(res, data) {
    if (Number.isInteger(data)) {
      res.sendStatus(data);
      return;
    }

    res.send(data);
  }

  // PUBLIC API

  const publicAPI = {
    ProcessUrl,
    ReturnError,
    SendData,
  }

  return publicAPI;
}


module.exports = Utils();
