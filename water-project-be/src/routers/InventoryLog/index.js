const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const InventoryLog = mongoose.model("InventoryLog");
const router = new Router({
  prefix: "/inventory-log",
});

router.get('/list',async (ctx)=>{
     let {
        type,
        size,
        page,
        goodId
     } = ctx.query;
    
     size =Number(size)
     page= Number(page)
    const list =  await InventoryLog
     .find({
         type,
         goodId
     })
     .sort({
         _id:-1
     })
     .skip((page-1)*size)
     .limit(size)
     .exec()
   
    const total = await InventoryLog.find({
        type,
        goodId
    }).countDocuments();
    
     ctx.body = {
         data:{
          total,
          list,
          page,
          size
         },
         code:1,
         msg:'获取列表成功'
     }
})
module.exports = router;
