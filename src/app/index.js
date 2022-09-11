const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');
const errorHandler = require('./error-handle');
const useRoutes = require('../router')

const app = new Koa();
app.useRoutes = useRoutes;

// 使用中间件
app.use(bodyParser());
app.useRoutes();
app.on('error', errorHandler);

module.exports = app;

