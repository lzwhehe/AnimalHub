const service = require('../service/comment.service')
class CommentController {
  // 所谓的create本质上就是向提前设计好的sql表插入数据
  async create(ctx, next) {
    // 对哪条动态发表的评论 
    const { momentId, content } = ctx.request.body;
    // 哪个用户发表 对哪条动态的评论
    const { id } = ctx.user;
    // 插入数据
    const res = await service.create(momentId, content, id);
    return ctx.body = res;
  }
  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params;
    const { id } = ctx.user;
    const res = await service.reply(momentId, content, id, commentId);
    return ctx.body = res;
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const [res] = await service.update(commentId, content);
    return ctx.body = res;
  }
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const [res] = await service.remove(commentId);
    return ctx.body = res;
  }
  async list(ctx, next) {
    const { momentId } = ctx.query;
    const [res] = await service.getCommentsByMomentId(momentId);
    ctx.body = res;
  }
}

module.exports = new CommentController();
