const Koa = require('koa')
const bodyParser = require('koa-bodyParser')
// const serve = require('koa-static')
// const { connect, initSchema } = require('./database/init')
const logger = require('koa-logger')
// const handle401  = require('./middlewares/handle401')
const registerRouter = require('./routers')

// ;(async () => {
//   await connect()
//   initSchema()
   
// })()

let port = process.env.port || 3000
const app = new Koa()

// app.use(handle401)  
   app.use(logger())
   .use(bodyParser())
   .use(registerRouter())
//    .use(serve(__dirname + '/views'))
   
app.listen(port, () => {
  console.log('will-server is running at http://localhost:3000')
})