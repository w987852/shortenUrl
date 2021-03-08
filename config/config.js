'use strict';

const dev = require('./env/dev');
const prod = require('./env/prod');

const defaults = {
}

let ret = {dev, prod}[process.env.NODE_ENV || 'dev'];
ret = Object.assign({}, defaults, ret);

module.exports = ret;