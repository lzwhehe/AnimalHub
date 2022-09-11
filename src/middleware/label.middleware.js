const service = require('../service/label.service')
const verifyLabelExists = async (ctx, next) => {
  // 验证完后需要将label信息进行处理+存储 ？
  //1. 取出要添加的标签
  const { labels } = ctx.request.body;
  // 2. 循环的去查询数据库
  const newLabels = [];
  for (let name of labels) {
    const labelRes = await service.isExitsLabel(name);
    const label = { name };
    if (!labelRes) {
      const res = await service.create(name);
      label.id = res.insertId;
    } else {
      // 需要将数据进行保存
      label.id = labelRes.id;
    }
    newLabels.push(label);
  }
  ctx.labels = newLabels;
  await next();
}

module.exports = {
  verifyLabelExists
}
