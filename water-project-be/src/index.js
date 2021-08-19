const koa = require("koa");
//对路由进行注册
const koaBody = require('koa-body');

const path=require('path');
const { connect } = require("./db");
const registeRoutes = require("./routers/index");
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser');
const wechat = require('koa-easywechat')
const serve = require('koa-static')
const app = new koa();
const {middleware:jwtMiddleWare,catchTokenError,checkUser} =require('./helpers/token')
const {logMiddleWare} = require('./helpers/log')

const home   = serve(path.join(__dirname,'/upload'));
const anthorHome =serve(path.resolve(__dirname,'../public'))
app.use(home) 
app.use(anthorHome)
const config = require('./project.config')
connect().then(() => {
  
  app.use(wechat({
    appID:"wxe53f9dcbd1582367",
    appsecret:"c370efe6f0df4f5a2644c165761b7d38",
    token:"water",
    isSafeModel:false,
    encodingAESKey:""
  },async function (next){
      await next();
    }
  ))
  app.use(cors())
  // app.use(koaBody({ multipart: true }))
  app.use(bodyParser()); 
  app.use(catchTokenError)
  jwtMiddleWare(app)
  
  app.use(checkUser)

 
  app.use(logMiddleWare)
  //对路由进行注册
  registeRoutes(app);

  
  app.listen(config.PORT, () => {
    console.log("启动成功");
  });
});
