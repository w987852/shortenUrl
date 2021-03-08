'use strict'
const {nanoid} = require('nanoid');

const hashName = 'shortenUrl';

class ShortenUrlService {
    static async createShortenUrl(url, expireDate) {
        let id;
        let isExists;
        do {
            id = await nanoid(10);
            isExists = await redis.hexists(hashName, id);
        } while (isExists)
        await redis.hmset(hashName, id, url, 'expireDate', expireDate);
        return id;
    }
    static async redirectUrl(shortenUrl) {
        console.log(shortenUrl)
        shortenUrl = await redis.hmget(hashName, shortenUrl, 'expireDate');
        console.log(shortenUrl);
        console.log(shortenUrl[0]);
        return shortenUrl[0];
    }
}

module.exports = ShortenUrlService;