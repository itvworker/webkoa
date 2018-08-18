
const Koa = require('koa');
const app = new Koa();
const router = require('./src/router');
const render = require('koa-ejs');


render(app, {
    root: path.join(__dirname, 'app/view'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

//启动并生成路由
router(app);
app.listen(9000);
