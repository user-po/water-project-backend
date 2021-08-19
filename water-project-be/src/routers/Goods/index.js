const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");

const Goods = mongoose.model("Goods");
const InventoryLog = mongoose.model('InventoryLog')
const multer = require('@koa/multer')
const {BASE_IMAGE_URL} = require('../../project.config')

var changedName
const GOOD_CONST = {
    IN:'IN_STOCK',
    OUT:'OUT_STOCK'
}
const findOneGood = async (id)=>{
  const one = await Goods.findOne({
      _id:id
  }).exec()

  return one;
}
const router = new Router({
  prefix: "/goods",
});
let storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'src/upload/images')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    
    changedName = (new Date().getTime())+'-'+file.originalname;
    cb(null, changedName);
  }
})
//加载配置
let upload = multer({ storage: storage });
router.post('/upload',upload.single('file'), async (ctx, next) => {

  let {
      id
  } = ctx.request.body;
  
  const good = await  findOneGood(id)

  if(!good){
    ctx.body ={
      code:0,
      msg: '没有找到商品'
    }

    return;
  }
  good.goodImgUrl = `${ctx.origin}/images/${changedName}`;

  await good.save();
  ctx.body = {
    code:1,
    msg:'上传成功',
    url: `${ctx.origin}/images/${changedName}`
    
  }
})

router.post("/add", async (ctx) => {
  let { 
      name,
      price,
      validityDate,
      discount,
      stock, 
      saleNumber, 
      classify,
      status=1 
  } = getBodyData(ctx);

  if (!discount) {
    discount = 0;
  }
  if (!saleNumber) {
    saleNumber = 0;
  }
  const goods = new Goods({
    name,
    price,
    validityDate,
    discount,
    stock,
    saleNumber,
    classify,
    status
  });

  const res = await goods.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: "添加成功",
  };
});

router.get("/list", async (ctx) => {
  let { page = 1, size = 20, keywords = "" } = ctx.request.query
  
  const query = {};
  let total;
  if (keywords) {
    query.name = keywords;
    
  }

  let list = await Goods.find(query)
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  if (!keywords) {
      total = await Goods.countDocuments();
  }else{
      total = list.length
  }
  ctx.body = {
    data: {
      list,
      total,
      page,
      size,
    },
    code: 1,
    msg: "获取数据成功",
  };
});

//DELETE  
router.delete('/:id',async (ctx) => {
   const {
     id
   } = ctx.params;

   const delMsg = await Goods.deleteOne({
     _id:id,
   })

   ctx.body = {
     data: delMsg,
     msg:'删除成功',
     code:1,
   }
})

router.post('/update/stock',async (ctx) => {
  let {
    id,
    num,
    type,
    goodId
  } = ctx.request.body;


  num = Number(num)
  const good = await  findOneGood(id)

  if(!good){
    ctx.body ={
      code:0,
      msg: '没有找到商品'
    }

    return;
  }
  
  //找到了书
  if(type === GOOD_CONST.IN){

    //入库
   num  = Math.abs(num);
  }else{
      //出库
      num  = -Math.abs(num);
  }
 
  good.stock = good.stock+num;
  
  if(good.stock<0){
    ctx.body = {
      code:0,
      msg:'剩下的量不足以出库'
    }
  }

  const res = await good.save();

  const log = new InventoryLog({
    num:Math.abs(num),
      type,
      goodId
  })

  //存储日志
  log.save();

  ctx.body = {
    code:1,
    msg:'操作成功',
    data:res
  }
})

router.post('/update',async (ctx)=>{
  const {
     id,
    //  name,
    //  price,
    //  validityDate,
    //  discount
    ...others
  } = ctx.request.body;

  const one = await findOneGood(id)

  if(!one){
      ctx.body = {
        code:0,
        msg:'没有找到商品'
      }
      return;
  }
  const newQuery = {}
  Object.entries(others).forEach(([key,value])=>{
    if(value){
       newQuery[key]=value
    }
  })
  //合并对象
  Object.assign(one,newQuery)

 const res =  await one.save();

 ctx.body = {
     data:res,
     code:1,
     msg: '保存成功'
 }
})

router.get('/detail/:id',async (ctx)=>{
  const {
    id,
  } = ctx.params;
  
  const one = await findOneGood(id)

if(!one){
    ctx.body = {
      code:0,
      msg:'没有找到商品'
    }
    return;
}
ctx.body={
  msg:'查询成功',
  code:1,
  data:one
}

})
module.exports = router;
