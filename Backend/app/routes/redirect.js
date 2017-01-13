/*
**  Redirection Routing
*/

const express = require('express');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');
const ShortURL = require('../models/shortURL');

const router = express.Router();


// Middleware function
// Redirects the user to the matching shortURL. If not found or invalid it returns a HTTP 404.

function tryRedirect(req, res) {
  const shortName = req.path.replace('/', '');

  console.log(`REQUEST :: GET from ${constants.IPV4[req.ip]} on PATH: ${shortName}`);

  if (shortName.length !== 4 || shortName === undefined) {
    res.sendStatus(constants.STATUS.NOTFOUND);
  }

  ShortURL.findDoc(shortName)
          .then((data) => { sendOrRedir(res, data); })
          .catch(utils.ReturnError);
}


/* Utility function that redirects or sends the response depending on
   the data received */

function sendOrRedir(res, data) {
  if (Number.isInteger(data)) {
    res.sendStatus(data);
    return;
  }

  let url = `http://${data.url}`;

  // Check if shortURL is HTTPS. If it is then correct URL.

  if (data.https) {
    url = url.replace('http', 'https');
  }

  res.redirect(url);
}


// Route

router.get('/*', tryRedirect);


module.exports = router;
