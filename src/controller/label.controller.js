const service = require('../service/label.service')
class labelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const [res] = await service.create(name);
    ctx.body = res;
  }
}

module.exports = new labelController();
