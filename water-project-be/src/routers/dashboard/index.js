const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const User = mongoose.model('User')
const Order = mongoose.model('Order');
const log = mongoose.model('Log')
const {formatTimeStamp,getEleNums,getThrityDays,getMonthElems} = require('../../helpers/utils/index')
const {verify,getToken} =require('../../helpers/token')
const router = new Router({
  prefix: "/dashboard",
});

router.get('/base-info',async (ctx)=>{
  const ordrerTotal = await Order.countDocuments();
  const userTotal = await User.countDocuments();
  const logTotal = await log.find({show:true}).countDocuments();

  ctx.body = {
      code:1,
      msg:'获取成功',
      data:{
          total:{
              order:ordrerTotal,
              user:userTotal,
              log:logTotal
          }
      }
  }
})

router.get('/hour-order-info',async (ctx)=>{
  const res = await Order.find({},{"meta.createTime":1})
   let item_res_hour = [];
   let result;
  res.map(item=>{
    result = formatTimeStamp(item.meta.createTime)
    item_res_hour.push(result.hour)
 
    
  })
  // console.log(getEleNums(item_res_hour))
   ctx.body = {
    code:1,
    msg:'获取成功',
    data:{
      hourCount:getEleNums(item_res_hour)
    }
   }
})

router.get('/day-order-info',async (ctx)=>{
  const res = await Order.find({},{"meta.createTime":1})
  const thrityDays = getThrityDays();
  let item_day=[];
  res.map(item=>{
    result = formatTimeStamp(item.meta.createTime)
    item_day.push(result.md)
 
    
  })


  ctx.body = {
    code:1,
    msg:'获取成功',
    data:{
        monthCount:getMonthElems(item_day,thrityDays),
        thritydays:thrityDays
    }
  }
})

router.get('/user-info',async (ctx)=>{
  const payload = await verify(getToken(ctx));
  const { _id } = payload;

    const user = await User.findOne({
        _id,
    }).exec()

    if(!user){
      ctx.body = {
          msg:'用户不存在',
          code:0,

      }
      return;
    }

    ctx.body = {
        code:1,
        msg:'获取成功',
        data:user
    }
})
module.exports = router;
