
'use strict'

const ShortenUrlService = require('app/services/ShortenUrlService');
const config = require('config/config');

module.exports = {
    createOne: createOne,
    readOne: readOne,
    redirect: redirect,
};

/**
 * @api {post} /shortenUrls  create new shortenUrl 
 * @apiDescription 建立短網址
 *
 * @apiName PostShortenUrls
 * @apiGroup ShortenUrl
 * @apiVersion 0.0.0
 *
 * @apiUse AuthHeader
 * @apiParam (Body Parameter) {String}           url            想要縮短的網址
 * @apiParam (Body Parameter) {Date}             [expireDate]   逾期時限
 *
 * @apiUse result Example
 * {
 *      "status": "success",
 *      "data": {
 *          "shortenUrl": "http://localhost:3002/shortenUrl/shortenUrls/P9f47DhEHx/redirection"
 *      }
 * }
 *
 */

async function createOne(req, res, next) {
    let url = _.get(req, 'body.url');
    let expireDate = _.get(req, 'body.expireDate');
    if (!url) {
        res.json({status: 'error', error: '缺少必填參數url'});
    }
    try {
        let id = await ShortenUrlService.createShortenUrl(url, expireDate);
        res.json({status: 'success', data: {shortenUrl: `${config.protocol}://${config.host}:${config.port}/shortenUrls/`+ id + '/redirection'}});
    } catch (error) {
        res.json({status: 'failed', error: error.toString()});
    }
}

/**
 * @api {get} /shortenUrls/:shortenUrlId/redirection  redirect shortenUrl to url 
 * @apiDescription 轉跳網頁
 *
 * @apiName GetShortenUrlRedirect
 * @apiGroup ShortenUrl
 * @apiVersion 0.0.0
 *
 * @apiUse AuthHeader
 * @apiParam (Param Parameter) {String}          shortenUrlId           短網址ID
 */

async function redirect(req, res, next) {
    let shortenUrlId = req.params.shortenUrlId;
    try {
        let url = await ShortenUrlService.redirectUrl(shortenUrlId);
        res.redirect(url);
    } catch (error) {
        res.json({status: 'failed', error: error.toString()});
    }
}

/**
 * @api {get} /shortenUrls/:shortenUrlId  get one  shortenUrl detail
 * @apiDescription 取得一筆短網址資訊
 *
 * @apiName GetOneShortenUrls
 * @apiGroup ShortenUrl
 * @apiVersion 0.0.0
 *
 * @apiUse AuthHeader
 * @apiParam (Param Parameter) {String}          shortenUrlId           短網址ID
 */

async function readOne(req, res, next) {
    let shortenUrlId = req.params.shortenUrlId;
    try {
        let shortenUrl = await ShortenUrlService.readShortenUrl(shortenUrlId);
        res.json({status: 'success', data: {shortenUrl}});
    } catch (error) {
        res.json({status: 'failed', error: error.toString()});
    }
}