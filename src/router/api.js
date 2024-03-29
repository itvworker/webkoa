const path = require('path');
const api = path.join(__dirname, '../controllers/api');
const middleware = path.join(__dirname, '../middleware/api')
const $r = require('./common');

//路由配置
let controllers = [
    {
        name: "usesReg",
        method: "get" ,
        path: "/user/reg",
        controller: '/user/Index@reg', //@后面是方法
        middleware: ['/User',"/Data"] //前置操作中间件
    },
    {
        name: 'userLogin',
        method: 'post',
        path: "/user/login",
        controller: '/user/Index@login'
    },
    {
        name: 'userAdd',
        method: 'get',
        path: "/user/add",
        controller: '/user/Index@add'
    }
]
module.exports = $r.resolve(controllers,api,middleware);
