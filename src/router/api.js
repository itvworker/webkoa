const path = require('path');
const api = path.join(__dirname, '../controllers/api');
const middleware = path.join(__dirname, '../middleware/api')
function resolve(arr) {
    return arr.map((value) => {
        let array = value.controller.split('@');
        value.controller = path.join(api, array[0]);
        value.action =  array[1];
        if(value.middleware){
            value.middleware = path.join(middleware, value.middleware);
        }
        return value;
    })
}

//路由配置
let controllers = [
    {
        name: "usesReg",
        method: "get" ,
        path: "/user/reg",
        controller: '/user/Index@reg', //@后面是方法
        middleware: '/User' //前置操作中间件
    },
    {
        name: 'userLogin',
        method: 'get',
        path: "/user/login",
        controller: '/user/Index@login'
    }
]
module.exports = resolve(controllers);
