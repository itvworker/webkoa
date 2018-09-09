exports.createRouter = function(app,opts,router) {

    opts.forEach(function(item,index){
        //先执行中间件
        if(item.middleware){
            app.use(require(item.middleware)())
        }

        let ctrl = require(item.controller);
        router.use(async (ctx, next) =>{
            ctrl.ctx = ctx;
            ctrl.next = next;
            if(ctrl.init){
                ctrl.init();
            }else{
                next();
            }
        })
        //生成路由
        router[item.method](item.name, item.path, async function(ctx,next) {
           ctrl[item.action]();
        })

        // router.post('api_teach_sort_detail', '/adSort/detail', async function (ctx, next) {
        //     await ctrl.adSort.detail(ctx, next);
        // });
    })

   app.use(router.routes());
}
