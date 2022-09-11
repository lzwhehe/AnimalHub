const fileService = require('../service/file.service');
const userervice = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')
class FileController {
  async saveAvataInfo(ctx, next) {
    // 1. 获取图像的信息
    const { mimetype, filename, size } = ctx.req.file;
    const id = ctx.user.id
    // 2. 将图片数据保存到图片信息表
    const res = await fileService.saveAvataInfo(mimetype, filename, size, id);
    // 3. 将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
    await userervice.updateAvatarUrlById(avatarUrl, id);
    // 4. 返回结果
    ctx.body = '上传头像成功~';
  }
  async savePictureInfo(ctx, next) {
    // 1. 获取图片信息
    const files = ctx.req.files;
    const id = ctx.user.id
    const { momentId } = ctx.query;
    // 2. 将所有的文件信息保存到数据库中
    for (let file of files) {
      const { mimetype, filename, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }
    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileController();
