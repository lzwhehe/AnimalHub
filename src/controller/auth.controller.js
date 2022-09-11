const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')
class AuthController {
  async login(ctx, next) {
    // 获取基本信息
    // 这里不传，能拿到的只有name,password, id是从sql查询的结果中得到的
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = { id, name, token };
  }
  async success(ctx, next) {
    ctx.body = '授权成功测试,继续完成接下动作';
  }
}

module.exports = new AuthController();
