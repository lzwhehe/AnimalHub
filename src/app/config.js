const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path')
// dotenv = 将env中的添加到process.env
dotenv.config();
// 注意运行目录是哪里
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));
module.exports = {
  APP_PORT,
  APP_HOST,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
