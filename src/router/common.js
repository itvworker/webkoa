const path = require('path');
const cors = require('@koa/cors');
const koajson = require('koa-json');
exports.createRouter = function(app, opts, router) {
    app.use(cors());
    router.use(koajson());

    opts.forEach(function(item, index) {
        //先执行中间件
        if (item.middleware && isArray(item.middleware)) {
            item.middleware.forEach((value, index) => {
                app.use(require(value)())
            });
        }
        if (item.middleware && !isArray(item.middleware)) {
            app.use(require(item.middleware)())
        }

        //执行init
        let ctrl = require(item.controller);
        router.use(async (ctx, next) => {
            ctrl.ctx = ctx;
            ctrl.next = next;
            if (ctrl.init) {
              await ctrl.init();
            } else {
                await  next();
            }

        })

        //生成路由
        router[item.method](item.name, item.path, async function(ctx, next){
            await ctrl[item.action]();
        })
    })

    //执行路由
    app.use(router.routes());
}

exports.resolve = function(arr, api, middleware) {
    return arr.map((value) => {
        let array = value.controller.split('@');
        value.controller = path.join(api, array[0]);
        value.action = array[1];
        if (value.middleware) {
            if (isArray(value.middleware)) {
                value.middleware = newArr(value.middleware, middleware);
            } else {
                value.middleware = path.join(middleware, value.middleware);
            }
        }
        return value;
    })
}

function newArr(arr, middleware) {
    return arr.map((item, index) => {
        return path.join(middleware, item);
    })
}

function isArray(arr) {
    return Array.isArray(arr);
}
