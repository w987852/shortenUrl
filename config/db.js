'use strict'
const Redis = require("ioredis");

module.exports = {
  init: () => {
    const client = new Redis();
    client.on('connect', () => {
      console.log('Redis connected');
      global.redis = client;
    });
    client.on('err', (err)=> {
      console.log('Redis Error', err);
    });
  }
}
