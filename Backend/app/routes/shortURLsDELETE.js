/*
**  Short URLs API - DELETE routing
*/

const express = require('express');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');
const ShortURL = require('../models/shortURL');

const router = express.Router();

// Deletes element based on the URI param

function handleDELETE(req, res) {
  const shortName = req.params.shortName;
  console.log(`REQUEST :: DELETE from ${constants.IPV4[req.ip]} -- SHORT_NAME: ${shortName}`);

  // Remove document if found and send a HTTP 200, otherwise send a HTTP 400.

  ShortURL.removeDoc(shortName)
          .then((data) => { utils.SendData(res, data); })
          .catch(utils.ReturnError);
}


router.delete('/api/shortURLs/:shortName', handleDELETE);


module.exports = router;
