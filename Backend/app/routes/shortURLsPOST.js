/*
** Short URLs API - POST routing
*/

const express = require('express');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');
const ShortURL = require('../models/shortURL');

const router = express.Router();


// Create document with the URL provided and shortName (if provided).

function handlePOST(req, res) {
  const shortName = req.body.shortName;
  const urlData = utils.ProcessUrl(req.body.url);
  const url = urlData.url;
  const https = urlData.https;

  if (!url) {
    res.sendStatus(constants.STATUS.BAD_REQUEST);
    return;
  }

  console.log(`REQUEST :: POST from ${constants.IPV4[req.ip]}
              -- SHORT_NAME: ${shortName} -- URL: ${url}`);

  // Create shortURL document

  const newShortURL = new ShortURL({
    url,
    https,
    shortName,
  });

  /* Check if URL is already in the database, if found return that document.
     If not found, create a new one with the provided shortName if valid,
     otherwise generate a new unique shortName. */

  ShortURL.checkIfURLexists(newShortURL)
          .then(ShortURL.validateShortName)
          .then(ShortURL.createDoc)
          .then((data) => { utils.SendData(res, data); })
          .catch(utils.ReturnError);
}


router.post('/api/shortURLs', handlePOST);


module.exports = router;
