const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handler')
const verifyUser = async (ctx, next) => {
  //  1. 获取用户和密码
  const { name, password } = ctx.request.body;
  // 2. 判断用户和密码不能为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 3. 判断这次注册的用户是否没有注册
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}
const handlerPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}
module.exports = {
  verifyUser,
  handlerPassword
}
