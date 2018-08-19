
global.config = require('./src/config');
global.db = require('mongoose');
db.Promise = global.Promise;
global.$ = require('./src/common/common');
// const mdb = db.connect(config.db);
const Koa = require('koa');
const app = new Koa();
const router = require('./src/router');
const render = require('koa-ejs');


render(app, {
    root: '/src/html',
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

// mdb.connection.on("error", function(error) {
//     console.log("数据库连接失败：" + error);
// });
// mdb.connection.on("open", function() {
//     console.log("数据库连接成功");
// })
// mdb.connection.on('disconnected', function() {
//     console.log('数据库连接断开');
// })

//启动并生成路由
router(app);
app.listen(9000);
