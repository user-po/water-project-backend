const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const koaJwt = require('koa-jwt')
const mongoose = require('mongoose');

const User = mongoose.model('User');
const verify = (token)=>{
   
    return new Promise((resolve,reject)=>{

          jwt.verify(token,config.JWT_SECRET,(err,payload)=>{
               if(err){
                 reject(err);
                 return;
               }

               resolve(payload)
          })
    })
}
const getToken = (ctx)=>{
    let {authorization} = ctx.header

   return  authorization.replace('Bearer ','').replace('bearer ','')

    
}

const middleware = (app)=>{
    app.use(koaJwt({
          secret: config.JWT_SECRET
    }).unless({
        path:[
            /^\/auth\/login/,
            /^\/auth\/register/,
            /^\/order\/list/,
            /^\/order\/add/,
            /^\/goods\/list/,
            /^\/message\/list/,
            /^\/wechat\/login/,
            /^\/images/,
            /^\/forget-password\/add/,
            /^\/upload\/file/,
           
        ]
    }))
}

const catchTokenError = async (ctx,next)=>{
    return next().catch(err=>{
          if(err.status === 401){
              ctx.status = 401;
              ctx.body = {
                  code:0,
                  msg:'token error'
              }
          }else{
              throw err;
          }
    })
}
const res401 = (ctx) => {
    ctx.status = 401;
    ctx.body = {
      code: 0,
      msg: '用户校验失败',
    };
  };
  
  const checkUser = async (ctx, next) => {
    const { path } = ctx;

    if (path==='/goods/list'||path === '/auth/login' || path === '/auth/register' || path === '/forget-password/add' || path.split('/')[1]==='images'||path==='/message/list'||path==='/order/list'||path==='/wechat/login'||path==='/upload/file'||path==='/order/add') {
      await next();
      return;
    }
  
    const { _id, account, character } = await verify(getToken(ctx));
  
    const user = await User.findOne({
      _id,
    }).exec();
  
    if (!user) {
      res401(ctx);
      return;
    }
  
    if (account !== user.account) {
      res401(ctx);
      return;
    }
  
    if (character !== user.character) {
      res401(ctx);
      return;
    }
  
    await next();
  };
  
module.exports = {
    verify,
    getToken,
    middleware,
    catchTokenError,
    checkUser,
}