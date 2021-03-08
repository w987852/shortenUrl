'use strict'
const {nanoid} = require('nanoid');
const moment = require('moment');

const hashName = 'shortenUrl';

class ShortenUrlService {
    /**
     * 建立短網址並存入DB
     * @param {String}  url             網址 
     * @param {Date}    expireDate      逾期時限
     * @return {String}                 短網址ID
     */
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
    /**
     * 跳轉網址
     * @param {String} shortenUrlId     短網址ID
     */
    static async redirectUrl(shortenUrlId) {
        let shortenUrl = await redis.hmget(hashName, shortenUrlId, 'expireDate');
        let [url, expireDate] = shortenUrl;
        let isExpired = moment().isAfter(moment(expireDate));
        if (!url || isExpired) {
            throw new Error('找不到相關連結或已逾期');
        } 
        return url;
    }
    /**
     * 查找短網址資料
     * @param {String} shortenUrlId     短網址ID
     * @return {String, Date}           {網址, 逾期時限} 
     */
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

module.exports = ShortenUrlService;