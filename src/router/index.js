const fs = require('fs');

const useRoutes = function() {
  // dir - 文件夹 file - 文件
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  })
}

module.exports = useRoutes
