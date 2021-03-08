
'use strict'

const ShortenUrlService = require('app/services/ShortenUrlService');
const config = require('config/config');

module.exports = {
    createOne: createOne,
    readOne: readOne,
    redirect: redirect,
}


async function createOne(req, res, next) {
    let url = _.get(req, 'body.url');
    let expireDate = _.get(req, 'body.expireDate');
    if (!url) {
        res.json({status: 'error', error: '缺少必填參數url'})
    }
    try {
        let id = await ShortenUrlService.createShortenUrl(url, expireDate);
        res.json({status: 'success', data: {shortenUrl: `${config.protocol}://${config.host}:${config.port}/shortenUrl/shortenUrls/`+ id + '/redirection'}});
    } catch (error) {
        
        res.json({status: 'failed', error: error.toString()});
    }

}
async function redirect(req, res, next) {
    let shortenUrlId = req.params.shortenUrlId;
    try {
        let url = await ShortenUrlService.redirectUrl(shortenUrlId);
        return res.redirect(url);
    } catch (error) {
        res.json({status: 'failed', error: error.toString()});
    }
}

async function readOne(req, res, next) {
    let shortenUrlId = req.query.shortenUrlId;
    try {
        let shortenUrl = await ShortenUrlService.readShortenUrl(shortenUrlId);
        return res.json({status: 'success', data: {shortenUrl}})
    } catch (error) {
        res.json({status: 'failed', error: error.toString()});
    }
}