const jwt = require('jsonwebtoken');
const errorType = require('../constants/error-types')
const userervice = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handler')
const { PUBLIC_KEY } = require('../app/config');
const verifyLogin = async function (ctx, next) {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 2. 判断是否存在用户
  const res = await userervice.getUserByName(name);
  const user = res[0];
  // 如果不存在
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }
  // 4. 判断密码和数据库密码是否一致(加密)
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }
  // 验证完之后将user放入ctx全局对象中
  ctx.user = user;
  await next();
}
const verifyAuth = async function (ctx, next) {
  // 检查授权详情
  const authorization = ctx.headers.authorization;
  // 如果authorization是空的话,就无法使用replace,所以需要验
  if (!authorization) {
    const err = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx);

  }
  const token = authorization.replace('Bearer ', '');
  // 这里需要使用try,catch捕获错误，防止token错误导致服务器停止运行
  try {
    // verify会将指定的用户信息+token封装成对象返回
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })
    // 通过了就next , 同时保存用户信息 
    ctx.user = res;
    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
  }

}
const verifyPermisson = async function (ctx, next) {
  // 1. 查询对应文章的userId字段，而后与user.id进行比对
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // 2. 查询是否具备权限 
  const isPermisson = await authService.check(tableName, resourceId, id);
  if (!isPermisson) {
    const err = new Error(errorType.UNPERMISSION);
    return ctx.app.emit('error', err, ctx);
  }
  await next();

}

module.exports = { verifyLogin, verifyAuth, verifyPermisson };
