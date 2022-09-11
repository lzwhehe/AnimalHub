const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs')

let app = new Koa();
const jwtRouter = new Router();
const PRIVATE_KEY = fs.readFileSync('./keys/private.key');
const PUBLIC_KEY = fs.readFileSync('./keys/public.key');
jwtRouter.get('/login', (ctx, next) => {
  const user = { id: 1, name: 'lzw' };
  // 身份认证 - 私钥签名
  const token = jwt.sign(user, PRIVATE_KEY, {
    expiresIn: 100,
    algorithm: "RS256"
  })
  ctx.body = token;
})
jwtRouter.get('/test', (ctx, next) => {
  //拿到token 
  const token = ctx.header.authorization.replace('Bearer ', '');
  try {
    // 身份认证 - 公钥验签
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.body = res;
  } catch (error) {
    console.log(error.message);
  }

})

app.use(jwtRouter.routes());
app.use(jwtRouter.allowedMethods());


app.listen(8000, (ctx, next) => {
  console.log('服务器开始监听');
})




