
global.config = require('./src/config');
global.db = require('mongoose');
db.Promise = global.Promise;
global.$ = require('./src/common/common');
db.connect(config.db);
global.token =  require("./src/store/token");
const Koa = require('koa');
const app = new Koa();
const router = require('./src/router');
const render = require('koa-ejs');
const koaBody = require('koa-body');
const resouce = require('koa-static2');
const session = require("koa-session2");
const Store = require("./src/store/store");


render(app, {
    root: '/src/html',
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});
app.use(session({
    store: new Store()
}));


app.use(koaBody({multipart: true}))
//app.use(cors());
app.use(resouce("",__dirname+"/public"));

db.connection.on("error",function(err){
    console.log("数据库连接失败：" + err);
})

db.connection.on("open", function() {
    console.log("数据库连接成功");
})

db.connection.on('disconnected', function() {
    console.log('数据库连接断开');
})


//启动并生成路由
router(app);
app.listen(config.port,'0.0.0.0');
