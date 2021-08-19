const mongoose = require('mongoose');
const {getMeta,preSave}  = require('../helpers')
const MessageSchema = new mongoose.Schema({
    message:String,
    show:Boolean,
    meta:getMeta()
  
});
MessageSchema.pre('save',preSave)
mongoose.model('Message',MessageSchema)