const Router = require('koa-router')
const router = new Router()

router.get('/', (ctx) => {
  console.log("router")
  ctx.body = "<h1>hello world</h1>"
})

module.exports  = router