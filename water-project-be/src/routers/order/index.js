const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const config = require('../../project.config')
const Order = mongoose.model("Order");
const {formatDate} = require('../../helpers/utils/index')
const fs = require('fs')
 //const nodeExcel = require('excel-export');
 const nodeExcel = require('excel-export-3')
const findOneOrder = async (id) => {
  const one = await Order.findOne({
    _id: id,
  }).exec();

  return one;
};
function getOrderCode() {
  var orderCode = "";
  for (
    var i = 0;
    i < 6;
    i++ //6位随机数，用以加在时间戳后面。
  ) {
    orderCode += Math.floor(Math.random() * 10);
  }
  orderCode = new Date().getTime() + orderCode; //时间戳，用来生成订单号。
  console.log(orderCode);
  return orderCode;
}

const router = new Router({
  prefix: "/order",
});

router.post("/add", async (ctx) => {
  let {
    orderNumber,
    orderGoods,
    payMentWay = "微信支付",
    receiver,
    phone,
    address,
    orderStatus,
    wxName='',
    price=10,
    wxid='',
    isFinish=false,
    remark='',
    goodImgUrl='',
    goodsCount=0
  } = getBodyData(ctx);
  if (!orderNumber) {
    orderNumber = getOrderCode();
  }
  if (!orderStatus) {
    orderStatus = 1;
  }
  const order = new Order({
    orderNumber,
    orderGoods,
    payMentWay,
    price,
    receiver,
    phone,
    address,
    orderStatus,
    remark,
    wxName,
    wxid,
    isFinish,
    goodImgUrl,
    goodsCount
    
  });

  const res = await order.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: "添加成功",
  };
});

router.get("/list", async (ctx) => {

  let {wxName,orderStatus,wxid,type,page = 1, size = 10, orderNumber} =  ctx.request.query;

  // if(ctx.query.para){
  //   var { page = 1, size = 10, orderNumber} = JSON.parse(ctx.query.para);
    
  // }
 
  const query = {};
  //查询客户端订单中没有结束的订单
  if(type === config.CLIENT){
    
     query.isFinish = false;
     page = 0;
     size=0;
     
    
  }
  let total;
  
  if (orderNumber) {
    
    query.orderNumber = orderNumber;
  }
  if(wxName){
    query.wxName = wxName;
  }
  if(wxName && orderStatus){
    query.wxName = wxName;
    query.orderStatus = orderStatus;
  }

  if(typeof(wxid)!=='undefined'){
    query.wxid = wxid;
  } 
  //阻挡查询全部订单的情况
  if(wxid  && orderStatus!=='1'){
    query.wxid = wxid;
    query.orderStatus = orderStatus;
  }else if(wxid  && orderStatus==='1'){
    query.wxid = wxid;
  }


  //console.log(query)

 //console.log(query,page)
  let list = await Order.find(query)
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  if (!orderNumber) {
    total = await Order.countDocuments();
  } else {
    total = list.length;
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
router.post("/updateStatus", async (ctx) => {
  let { id,type } = getBodyData(ctx);
  let res;


  const one = await findOneOrder(id);

  //console.log(one)
  if (!one) {
    ctx.body = {
      code: 0,
      msg: "没有找到商品",
    };
    return;
  }
  if(one.orderStatus === 4){
    ctx.body = {
      code: 0,
      msg: "已收货不能更改!",
    };
    return;
  }
  if (type === "SEND_GOOD") {
    one.orderStatus = 2;
  }else if(type === 'CANCEL_SEND_GOOD') {
    one.orderStatus = 3;
  } else if(type === 'HAS_RECEIVE'){
    one.orderStatus = 4;
    one.isFinish = true;
  }
  else {
    one.orderStatus = 1;
  }
  res = await one.save();
 

  ctx.body = {
    data: res,
    code: 1,
    msg: "保存成功",
  };
});
router.get('/order-get-excel',async (ctx)=>{
    let conf = {}
    let {
      startTime,
      endTime,
      fileType:orderStatus
    } = ctx.request.query;
    // conf.stylesXmlFile = "./styles.xml";
    conf.name = "mysheet";
    conf.rows=[]
    conf.cols =[{
      caption:'订单号',
       type:'string'
    },{
      caption:'商品分类',
       type:'string'
    },
    {
      caption:'支付方式',
       type:'string'
    },
    {
      caption:'价格',
       type:'number'
    },
    {
      caption:'收货人',
       type:'string'
    }, {
      caption:'收货电话',
       type:'string'
    },
    {
      caption:'收货地址',
       type:'string'
    },
    {
      caption:'下单时间',
       type:'string'
    }
  ]
  let query = {"$and":[{"meta.createTime":{"$gt":startTime}},{"meta.createTime":{"$lt":endTime}}]};

  if(orderStatus){
    query.orderStatus = Number(orderStatus)
  }
  const res =  await Order.find(query).exec()

  for(let item of res){
    
    conf.rows.push([item.orderNumber,item.orderGoods,item.payMentWay,item.price,item.receiver,item.phone,item.address,formatDate(item.meta.createTime)])
  }
  //console.log(conf.rows)
  let result = nodeExcel.execute(conf);

  const data = Buffer.from(result,'binary');

ctx.set('Content-Type', 'application/vnd.openxmlformats');
ctx.set('Access-Control-Expose-Headers','Content-Disposition')
ctx.set("Content-Disposition", `attachment; filename=order-${new Date().getTime()}.xlsx`);
 ctx.body = data
})
router.post('/updateStatusByTime',async (ctx)=>{
      let {
        startTime,
        endTime,
        type
      } = ctx.request.body;
     
    const res =  await Order.find({"$and":[{"meta.createTime":{"$gt":startTime}},{"meta.createTime":{"$lt":endTime}}]}).exec()
  
    for(let item of res){
      if(item.orderStatus===4){
        ctx.body = {
          code: 0,
          msg: "已收货不能更改!",
        };
        return;
      }else{
        if (type === "SEND_GOOD") {
          item.orderStatus = 2;
        }else if(type === 'CANCEL_SEND_GOOD') {
          item.orderStatus = 3;
        } else if(type === 'HAS_RECEIVE'){
          item.orderStatus = 4;
          item.isFinish = true;
        } else {
          item.orderStatus = 1;
        }
        await item.save()
      }
    }

    //const result = await res.save()
    ctx.body={
      msg:'更改成功',
      code:1,
      data:res
    }

})
module.exports = router;
