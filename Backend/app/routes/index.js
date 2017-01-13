/*
**  Short URLs API - Index routing
*/

const express = require('express');
const constants = require('../../config/env/constants');

const router = express.Router();

// Redirects to the frontEnd URL

function sendIndex(req, res) {
  res.redirect(constants.FRONTEND_URL);
}


router.get('/', sendIndex);


module.exports = router;
