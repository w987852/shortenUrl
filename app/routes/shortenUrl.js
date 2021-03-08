'use strict';

const express = require('express');
const router = express.Router();

const shortenUrl = require('app/controllers/shortenUrl');

/**
 * Expose
 */


router.post('/shortenUrls', shortenUrl.createOne);

// read
router.get('/shortenUrls/:shortenUrlId', shortenUrl.readOne);
router.get('/shortenUrls/:shortenUrlId/redirection', shortenUrl.redirect)


module.exports = router;