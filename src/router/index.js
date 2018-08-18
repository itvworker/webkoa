const KoaRouter = require('koa-router');
const Path = require('path');
const api = require('./api');
const $route = require('./common');
let router = new KoaRouter({
    prefix: '/api'
})
module.exports = function(app) {
    $route.createRouter(app,api,router);
};
