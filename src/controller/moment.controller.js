const fs = require('fs');
const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const {PICTURE_PATH} = require('../constants/file-path')
class MomentController {
   async create(ctx, next) {
      // 1.获取数据 - 到底是谁发布的 userId , content 
      const userId = ctx.user.id;
      const content = ctx.request.body.content;
      // 2.将数据插入数据库中
      const res = await momentService.create(userId, content);
      ctx.body = res;
   }
   async detail(ctx, next) {
      // 1. 拿到用户输入的momentId
      // console.log(ctx.params.momentId);
      const momentId = ctx.params.momentId;
      // 2. 根据id去查询数据库中的相关信息
      const res = await momentService.getMomentById(momentId);
      ctx.body = res;

   }
   async list(ctx, next) {
      // 1.获取数据
      const { offset, size } = ctx.query;
      // 2.查询列表 
      const res = await momentService.getMomentByList(offset, size);
      ctx.body = res;
   }
   async update(ctx, next) {
      // 1. 拿到之后要用到的数据 - momentId , content , userId
      const { momentId } = ctx.params;
      const { content } = ctx.request.body;
      const [res] = await momentService.update(momentId, content);
      ctx.body = res;
   }
   async remove(ctx, next) {
      const { momentId } = ctx.params;
      const [res] = await momentService.remove(momentId);
      ctx.body = res;
   }
   async addLabels(ctx, next) {
      const { labels } = ctx;
      const { momentId } = ctx.params;
      for (let label of labels) {
         // 判断标签是否存在,因为本身还是对moment进行的操作
         const isExit = await momentService.isExitLabel(momentId, label.id);
         if (!isExit) {
            const res = await momentService.addLabel(momentId, label.id);
         }
      }
      ctx.body = '添加标签成功~'
   }
   async fileInfo(ctx, next) {
      const { filename } = ctx.params;
      const fileInfo = await fileService.getFileByFileName(filename);
      ctx.response.set('content-type',fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)

   }
}

module.exports = new MomentController();
