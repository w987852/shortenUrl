'use strict';

const express = require('express');
const router = express.Router();

/**
 * Expose
 */




// read
router.get('/', (req, res) => {
    return res.render('index', {title: 'test'})
});



module.exports = router;