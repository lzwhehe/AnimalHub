const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware')
const { create } = require('../controller/label.controller');
const lableRouter = new Router({ prefix: '/label' });

lableRouter.post('/', verifyAuth, create);


module.exports = lableRouter;
