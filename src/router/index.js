const KoaRouter = require('koa-router');
const Path = require('path');
const api = require('./api'); //api路由配置
const $route = require('./common');
let router = new KoaRouter({ // 建立api路由对象
    prefix: '/api'
})
module.exports = function(app) {
    $route.createRouter(app,api,router);
};
