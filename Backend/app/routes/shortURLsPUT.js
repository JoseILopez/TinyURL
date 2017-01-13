/*
** Short URLs API - PUT routing
*/

const express = require('express');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');
const ShortURL = require('../models/shortURL');

const router = express.Router();


// Update document's URL and HTTPS based on the shortName paramenter

function handlePUT(req, res) {
  const urlData = utils.ProcessUrl(req.body.url);
  const url = urlData.url;
  const https = urlData.https;
  const shortName = req.params.shortName;

  // Send HTTP 400 if url is not provided

  if (!url || !shortName) {
    res.sendStatus(constants.STATUS.BAD_REQUEST);
    return;
  }

  console.log(`REQUEST :: PUT from ${constants.IPV4[req.ip]} 
              -- SHORT_NAME: ${shortName} -- URL: ${url}`);

  ShortURL.updateDoc(shortName, url, https)
          .then((data) => { utils.SendData(res, data); })
          .catch(utils.ReturnError);
}


router.put('/api/shortURLs/:shortName', handlePUT);


module.exports = router;
