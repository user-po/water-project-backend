const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const GoodsClassify = mongoose.model('GoodsClassify')
const router = new Router({
  prefix: "/good-classify",
});

router.get('/list',async (ctx)=>{
     const list = await GoodsClassify
     .find()
     .sort({
         _id:-1
     })
     .exec()
 
     ctx.body = {
         data:list,
         code:1,
         msg:'获取列表成功'
     }
})
router.post('/add',async (ctx)=>{
  const {
    title
  } = ctx.request.body
  const one =  await GoodsClassify.findOne({
      title
  }).exec()

  if(one){
      ctx.body={
        code:0,
        msg:'该分类已存在'
      } 
      return;
  }
  const goodClassify = new GoodsClassify({
      title,
  })

 const data = await  goodClassify.save()
 ctx.body = {
    data,
    code:1,
    msg:'添加成功'
 }
})
router.post('/update/title',async (ctx)=>{
  const {
      id,
      title
  } = ctx.request.body;

  const one = await GoodsClassify.findOne({
      _id:id
  })

  if(!one){
      ctx.body = {
          msg:'资源不存在',
          code:0,

      }
  }

  one.title = title;

  const res = await one.save()

  ctx.body = {
      code:1,
      msg:'修改成功',
      data:res
  }
})
router.delete('/:id',async (ctx)=>{
    const {
        id
    } = ctx.params;

   const res = await GoodsClassify.deleteOne({
        _id:id
    })

    ctx.body = {
        code:1,
        msg:'删除成功',
        data:res
    }
})

module.exports = router;
