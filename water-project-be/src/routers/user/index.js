const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const User = mongoose.model("User");
const Character = mongoose.model("Character");
const config = require("../../project.config");
const {loadExcel,getFirstSheet} = require('../../helpers/excel')
const {verify,getToken} =require('../../helpers/token')
const router = new Router({
  prefix: "/user",
});

router.get("/list", async (ctx) => {
  let { page, size, keywords } = ctx.query;
  page = Number(page);
  size = Number(size);

  const query = {};

  if (keywords) {
    query.account = keywords;
  }
  const list = await User.find(query)
    .sort({
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();
  const total = await User.countDocuments().exec();
  ctx.body = {
    msg: "获取列表成功",
    data: {
      list,
      page,
      size,
      total,
    },
    code: 1,
  };
});

router.delete("/:id", async (ctx) => {
  const { id } = ctx.params;
  const delMsg = await User.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: "删除成功",
  };
});
router.post("/add", async (ctx) => {
  const { account, password, character } = ctx.request.body;

  const char = await Character.findOne({
    _id: character,
  });

  if (!char) {
    ctx.body = {
      msg: "出错啦",
      code: 0,
    };
    return;
  }
  const user = new User({
    account,
    password: password || config.DEFAULT_PASSWORD,
    character,
  });

  const res = await user.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: "添加成功",
  };
});

router.post('/addMany',async (ctx)=>{
  const {
    key=''
  }=ctx.request.body;

  const path =`${config.UPLOAD_DIR}/${key}`;

 const excel =  loadExcel(path);

 const sheet = getFirstSheet(excel)
 

 const character = await Character.find().exec();

 const member = character.find((item) => (item.name === 'member'));
 

 const arr = [];
 for (let i = 0; i < sheet.length; i++) {
   let record = sheet[i];

   const [account, password = config.DEFAULT_PASSWORD,companyName] = record;

   const one = await User.findOne({
     account,
   })

   if (one) {
     continue;
   }

   arr.push({
     account,
     password,
     companyName,
     character: member._id,
   });
 }

 await User.insertMany(arr)

 ctx.body={
   code:1,
   msg:'添加成功',
 }
})
router.post("/reset/password", async (ctx) => {
  const { id } = ctx.request.body;

  const user = await User.findOne({
    _id: id,
  }).exec();

  if (!user) {
    ctx.body = {
      msg: "找不到用户",
      code: 0,
    };
    return;
  }

  user.password = config.DEFAULT_PASSWORD;

  const res = await user.save();

  ctx.body = {
    msg: "修改成功",
    code: 1,
    data: {
      account: res.account,
      _id: res._id,
    },
  };
});

router.post("/update/character", async (ctx) => {
  const { character, userId } = ctx.request.body;

  const char = await Character.findOne({
    _id: character,
  });

  if (!char) {
    ctx.body = {
      msg: "出错啦",
      code: 0,
    };
    return;
  }

  const user = await User.findOne({
    _id: userId,
  });

  if(!user){
      ctx.body = {
         msg:'出错啦',
         code:0
      }
      return;
  }

  user.character = character;

  const res = await user.save();

  ctx.body = {
    data:res,
    code:1,
    msg:'修改成功'
  }
});

router.get('/info',async (ctx)=>{
    //Authorization: Bearer token
    ctx.body = {
      data: await verify(getToken(ctx)),
      code:1,
      msg:'获取成功'
    }


})
module.exports = router;
