const mongoose = require('mongoose');
const {getMeta,preSave}  = require('../helpers')
const GoodsSchema = new mongoose.Schema({
    // 商品名
    name:String,
    //价格
    price:Number,
    //商品有效期
    validityDate:String,
    //折扣
    discount:Number,
    //库存
    stock: Number,
    //销量
    saleNumber: Number,
    //商品分类
    classify:String,
    //商品状态 
    status:Number,
    //商品图片地址
    goodImgUrl:String,
    meta:getMeta()
  
});
GoodsSchema.pre('save',preSave)
mongoose.model('Goods',GoodsSchema)