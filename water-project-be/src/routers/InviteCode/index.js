const Router = require("@koa/router");
const mongoose = require("mongoose");
const {getBodyData} = require('../../helpers/utils/index')
const InviteCode = mongoose.model("InviteCode");
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const router = new Router({
  prefix: "/invite",
});

router.post("/add", async (ctx) => {

  const {
    count = 1
  } = ctx.request.body;

  const arr = [];

  for(let i = 0;i<count;++i){
    arr.push({
      code: uuidv4(),
      user:''
    })
  }
   
  const res = await InviteCode.insertMany(arr)


   ctx.body={
       code:1,
      data:res,
       msg:'创建成功!'
   }
 
});

router.get('/list',async (ctx)=>{
   let {
     page,
     size
   } = ctx.request.query;

   page =Number(page);
   size = Number(size);

  const list = await InviteCode
        .find()
        .sort({
          _id:-1
        })
        .skip((page -1)*size)
        .limit(size)
        .exec()
const total = await InviteCode.countDocuments();
        ctx.body={
          data:{
            list,
            total,
            page,
            size
          },
          msg:'获取列表成功'
        }
})

router.delete('/:id',async (ctx)=>{
  const {
    id
  } = ctx.params;

  const res = await InviteCode.deleteOne({
    _id:id
  })

  ctx.body = {
    code:1,
    msg:'删除成功',
    data:res
  }
})
module.exports = router;
