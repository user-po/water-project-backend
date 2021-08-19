const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const Message = mongoose.model("Message");
const router = new Router({
  prefix: "/message",
});

router.get('/list',async (ctx)=>{
     let {
        size,
        page,
        show=false
     } = ctx.query;
    
     size =Number(size)
     page= Number(page)
     let query = {}
    

     if(show){
         query.show = show;
     }
     
        const  list =  await Message
        .find(query)
        .sort({
            _id:-1
        })
        .skip((page-1)*size)
        .limit(size)
        .exec()
     
   
   
    const total = await Message.countDocuments();
    
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

router.post('/add',async (ctx)=>{
    const {
        message,
        show=false
    } = ctx.request.body;

    const msg = new Message({
          message,
          show
    })

    const res = await msg.save()

    ctx.body ={
        code:1,
        msg:'新建成功',
        data:res
    }
})

router.post('/update/status',async (ctx)=>{
     const {
         id,
         show
     } = ctx.request.body;

     const one = await Message.findOne({
         _id:id
     })
     
     const oneIsShow  = await Message.findOne({
           show:true
     }).exec()

     if(oneIsShow){
        oneIsShow.show = false;
        await oneIsShow.save()
     }
     if(!one){
         ctx.body = {
             code:0,
             msg:'未找到资源'
         }
     }
     one.show = show;
     
     
     const res =  await one.save()
                   

     ctx.body = {
         code:1,
         msg:'修改成功',
         data:res
     }
})

router.delete('/:id',async (ctx)=>{
    const {
        id
    } = ctx.request.params;

   const res = await Message.deleteOne({
        _id:id
    })

    ctx.body = { 
        code:1,
        msg:'删除成功',
        data:res
    }
})
module.exports = router;
