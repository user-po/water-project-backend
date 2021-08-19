const auth = require('./auth/index');
const invite = require('./InviteCode/index')
const order = require('./order/index')
const goods = require('./Goods/index')
const InventoryLog = require('./InventoryLog/index')
const wechat = require('./wechatAuth/index')
const user = require('./user/index')
const character  = require('./character')
const log = require('./log')
const forgetPassword = require('./ForgetPassWord')
const goodClassify = require('./good-classify')
const message = require('./message')
const profile = require('./profile')
const dashboard = require('./dashboard')
const upload = require('./uploads')
module.exports = (app)=>{
   app.use(auth.routes())
   app.use(invite.routes())
   app.use(order.routes())
   app.use(goods.routes())
   app.use(InventoryLog.routes())
   app.use(wechat.routes())
   app.use(user.routes())
   app.use(character.routes())
   app.use(log.routes())
   app.use(forgetPassword.routes())
   app.use(goodClassify.routes())
   app.use(message.routes())
   app.use(profile.routes())
   app.use(dashboard.routes())
   app.use(upload.routes())
}