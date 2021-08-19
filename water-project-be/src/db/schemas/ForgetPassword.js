const mongoose = require('mongoose');
const {getMeta,preSave}  = require('../helpers')
const ForgetPasswordSchema = new mongoose.Schema({

    account:String,
    status:Number,
    // 1 待处理
    // 2 已重置
    // 3 已忽略

    meta:getMeta()
  
});
ForgetPasswordSchema.pre('save',preSave)
mongoose.model('ForgetPassword',ForgetPasswordSchema)