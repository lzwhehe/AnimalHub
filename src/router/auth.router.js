const Router = require('koa-router');

const { login, success } = require('../controller/auth.controller.js');
const {
  verifyLogin,
  verifyAuth,
} = require('../middleware/auth.middleware');
const authRouter = new Router();
// 这里进行了一次中间件的数据传递,verifyLogin将user的信息通过ctx传到了login当中，为了实现接来的sign
authRouter.post('/login', verifyLogin, login);
authRouter.post('/test', verifyAuth, success);

module.exports = authRouter;



