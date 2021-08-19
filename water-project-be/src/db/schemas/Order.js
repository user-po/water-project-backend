const mongoose = require('mongoose');
const {getMeta,preSave}  = require('../helpers')
const OrderSchema = new mongoose.Schema({
    orderNumber: String,
    //商品分类
    orderGoods:String,
    payMentWay:String,
    price:Number,
    receiver:String,
    phone:String,
    address:String,
    orderStatus:Number,
    remark:String,
    wxName:String,
    wxid:String,
    isFinish:Boolean,
    goodImgUrl:String,
    goodsCount:Number,
    meta:getMeta()
  
});
OrderSchema.pre('save',preSave)
mongoose.model('Order',OrderSchema)