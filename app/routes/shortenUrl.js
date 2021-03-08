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


router.get('/', (req, res) => {
  return res.render('index', {title: '短網址轉換服務'})
});


module.exports = router;