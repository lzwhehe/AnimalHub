const Router = require("koa-router");

const { verifyAuth, verifyPermisson } = require('../middleware/auth.middleware')
const { create, detail, list, update, remove, addLabels,fileInfo } = require('../controller/moment.controller')
const {
  verifyLabelExists
} = require('../middleware/label.middleware')
const momentRouter = new Router({ prefix: '/moment' });
momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
// patch - 修改
// 1. 认证令牌信息 2. 认证用户id信息 
momentRouter.patch('/:momentId', verifyAuth, verifyPermisson, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermisson, remove);

// 为动态添加标签(建立多对多关系) = 建立关系表，并在关系表中插入他们的对应关系
// 注意第三步操作 - 在添加标签之前注意要检查标签是否已经存在
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermisson, verifyLabelExists, addLabels)
momentRouter.get('/images/:filename',fileInfo)
module.exports = momentRouter;


