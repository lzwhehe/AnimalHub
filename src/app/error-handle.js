const errorTypes = require('../constants/error-types')
const errorHandler = (error, ctx) => {
   let status, message;
   switch (error.message) {
      case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
         status = 400; // bad request
         message = '用户名密码不能为空';
         break;
      case errorTypes.USER_ALREADY_EXISTS:
         status = 409;  // confilt
         message = '用户名已经存在';
         break;
      case errorTypes.USER_DOES_NOT_EXISTS:
         status = 400;  // confilt
         message = '该用户不存在！';
         break;
      case errorTypes.PASSWORD_IS_INCORRENT:
         status = 400;  // confilt
         message = '用户密码错误请重新输入密码';
         break;
      case errorTypes.UNAUTHORIZATION:
         status = 401;  // confilt
         message = '无效的Token';
         break;
      case errorTypes.UNPERMISSION:
         status = 401;  // confilt
         message = '您不具备操作权限';
         break;
      default:
         status = 404;
         message = 'NOT FOUND'

   }
   ctx.status = 404;
   ctx.body = message;
}
module.exports = errorHandler;
