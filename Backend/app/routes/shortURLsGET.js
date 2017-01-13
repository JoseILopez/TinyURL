/*
** Short URLS API - GET routing
*/

const express = require('express');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');
const ShortURL = require('../models/shortURL');

const router = express.Router();


// Retrieve all elements

function getAll(req, res) {
  console.log(`REQUEST :: GET from ${constants.IPV4[req.ip]} on: ${req.path}`);

  ShortURL.findDoc()
          .then((data) => { utils.SendData(res, data); })
          .catch(utils.ReturnError);
}

function getByShortName(req, res) {
  const shortName = req.params.shortName;

  console.log(`REQUEST :: GET from ${constants.IPV4[req.ip]} on: ${req.path}`);

  // Find the document and send it. If not found send a HTTP 404.

  ShortURL.findDoc(shortName)
          .then((data) => { utils.SendData(res, data); })
          .catch(utils.ReturnError);
}


router.get('/api/shortURLs', getAll);
router.get('/api/shortURLs/:shortName', getByShortName);


module.exports = router;
