
'use strict'

const moment = require('moment');

const ShortenUrlService = require('app/services/ShortenUrlService');

module.exports = {
    createOne: createOne,
    readOne: readOne,
    redirect: redirect,
}


async function createOne(req, res, next) {
    let url = req.body.url;
    let expireDate = _.get(req, 'body.expireDate');
    let id = await ShortenUrlService.createShortenUrl(url, expireDate);
    res.send(id)
}

async function redirect(req, res, next) {
    let shortenUrlId = req.params.shortenUrlId;
    let url = await ShortenUrlService.redirectUrl(shortenUrlId);
    var os = require('os');
    var networkInterfaces = os.networkInterfaces();

    console.log(networkInterfaces);
    return res.send(url)
    return res.redirect(url)
}

async function readOne(req, res, next) {
    let shortenUrlId = req.query.shortenUrlId;
    let url = await ShortenUrlService.redirectUrl(shortenUrlId);
    return res.redirect('/')
}