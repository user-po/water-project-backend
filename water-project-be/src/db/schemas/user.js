const mongoose = require('mongoose');
const {getMeta,preSave}  = require('../helpers')
const UserSchema = new mongoose.Schema({
    account: String,
    password:String,
    character:String, // 文案 类型 权限
    companyName:String,
    meta:getMeta()
  
});
UserSchema.pre('save',preSave)
mongoose.model('User',UserSchema)