/*
** Short URLs API - PURGE routing
*/

const express = require('express');
const constants = require('../../config/env/constants');
const utils = require('../../../Utilities/utils');
const ShortURL = require('../models/shortURL');

const router = express.Router();

// Wipes database and adds the default document (as defined in config/env/constants.js)

function handlePURGE(req, res) {
  console.log(`REQUEST :: PURGE from ${constants.IPV4[req.ip]}`);

  ShortURL.resetDB()
          .then(() => { res.sendStatus(constants.STATUS.OK); })
          .catch(utils.ReturnError);
}


router.purge('/api/shortURLs', handlePURGE);


module.exports = router;
