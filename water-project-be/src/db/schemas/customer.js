const mongoose = require('mongoose');
const {getMeta,preSave}  = require('../helpers')
const CustomerSchema = new mongoose.Schema({
    wechat:Object,
    name:String,
    avator:String,
    meta:getMeta()
  
});
CustomerSchema.pre('save',preSave)
mongoose.model('Customer',CustomerSchema)