const Router = require('koa-router');
const {
  create,
  avatarInfo
} = require('../controller/user.controller')
const {
  verifyUser,
  handlerPassword,
} = require('../middleware/user.middleware')
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const userRouter = new Router({ prefix: '/user' });

// 中间件(用户数据的拦截处理) ， 中间件(用户数据的拦截处理) ，中间件(Action-都被封装在了某类控制器中) 
userRouter.post('/', verifyUser, handlerPassword, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter;
