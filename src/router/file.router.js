const Router = require('koa-router');
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware');
const {
  verifyAuth
} = require('../middleware/auth.middleware');
const {
  saveAvataInfo,
  savePictureInfo
} = require('../controller/file.controller');

const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvataInfo);
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter;

