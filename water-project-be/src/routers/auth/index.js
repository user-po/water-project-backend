const Router = require("@koa/router");
const mongoose = require("mongoose");
const {getBodyData} = require('../../helpers/utils/index')
const User = mongoose.model("User");
const Character = mongoose.model("Character")
const InviteCode = mongoose.model('InviteCode')
const jwt = require('jsonwebtoken')
const config = require('../../project.config')
const router = new Router({
  prefix: "/auth",
});

router.post("/register", async (ctx) => {
  const { account, password,inviteCode,companyName } = getBodyData(ctx);
 if(account==='' || password==='' || inviteCode ===''){
  ctx.body = {
    code: 0,
    msg: "字段不能为空",
    data: null,
  };
  return;
 }
 //找邀请码
const findCode = await InviteCode.findOne({
     code: inviteCode,
}).exec();
 //如果没找到
if(!findCode || findCode.user){
  ctx.body = {
    code: 0,
    msg: "邀请码不正确",
    data: null,
  };
  return;
}
 //去找account为传递来的值的用户
  const findUser = User.findOne({
    account,
  }).exec();
 let result = await findUser;
 // 判断有没有用户
  if (result) {
    ctx.body = {
        code: 0,
        msg: "已存在该用户",
        data: null,
      };
    return;
  }
  const character = await Character.find().exec();

 const member = character.find((item) => (item.name === 'member'));
  //创建一个用户
  const user = new User({
    account,
    password,
    character:member._id,
    companyName
  });
 //同步到数据库
  const res = await user.save();
  //邀请码对应到一个用户
  findCode.user = res._id;
  findCode.meta.updatedTime = new Date().getTime();
  await findCode.save();
 //成功
  ctx.body = {
    code: 1,
    msg: "注册成功",
    data: res,
  };
});

router.post("/login", async (ctx) => {
  const {password,account} = getBodyData(ctx);
  if(account==='' || password===''){
    ctx.body = {
      code: 0,
      msg: "字段不能为空",
      data: null,
    };
    return;
   }
  const one = await User.findOne({
    account,
  }).exec()
  if(!one){
    
     ctx.body = {
       code: 0,
       msg:'用户名或密码错误' ,
       data:null
     }

     return;
  }

  const user = {
    account: one.account,
    character:one.character,
    _id:one._id
  }
  if(one.password === password){
    
    ctx.body = {
      code: 1,
      msg:'登入成功' ,
      data:{
        user,
        token: jwt.sign(user,config.JWT_SECRET)
      }
    }
  }else{
    ctx.body = {
      code: 0,
      msg:'用户名或密码错误' ,
      data:null
    }
  }
  
 
});

module.exports = router;
