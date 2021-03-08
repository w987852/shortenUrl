'use strict'
const {nanoid} = require('nanoid');
const moment = require('moment');

const hashName = 'shortenUrl';

class ShortenUrlService {
    static async createShortenUrl(url, expireDate) {
        let id;
        let isExists;
        do {
            //id = await nanoid(10);
            id = randomStr(10)
            isExists = await redis.hexists(hashName, id);
        } while (isExists)
        await redis.hmset(hashName, id, url, 'expireDate', expireDate);
        return id;
    }
    static async redirectUrl(shortenUrlId) {
        let shortenUrl = await redis.hmget(hashName, shortenUrlId, 'expireDate');
        let [url, expireDate] = shortenUrl;
        let isExpired = moment().isAfter(moment(expireDate));
        if (!url || isExpired) {
            throw new Error('找不到相關連結或已逾期');
        } 
        return url;
    }
    static async readShortenUrl(shortenUrlId) {
        let shortenUrl = await redis.hmget(hashName, shortenUrlId, 'expireDate');
        let [url, expireDate] = shortenUrl;
        if (!url) {
            throw new Error('找不到相關連結');
        }
        return {
            url,
            expireDate,
        };
    }
}

function randomStr(length) {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str += _.sample(possible);
    }
    return str;
}
module.exports = ShortenUrlService;