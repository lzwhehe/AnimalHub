const fs = require('fs');

const service = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path');
class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const res = await service.create(user);
    // 返回数据
    ctx.body = `${user.name}用户创建成功`;
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const res = await service.getImgById(userId);
    // 设置响应数据类型为图片，浏览器会根据http连接响应后设置的数据类型由浏览器进行对应的数据渲染
    ctx.response.set('content-type', res.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${res.filename}`)
  }
}
module.exports = new UserController();
