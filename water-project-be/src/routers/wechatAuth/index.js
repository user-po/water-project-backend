const Router = require("@koa/router");
const mongoose = require("mongoose");
const { getBodyData } = require("../../helpers/utils/index");
const axios = require("axios");
const Customer = mongoose.model("Customer");
const router = new Router({
  prefix: "/wechat",
});

router.post("/login", async (ctx) => {
  let { code } = getBodyData(ctx);
  const weToken = await axios.get(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxe53f9dcbd1582367&secret=c370efe6f0df4f5a2644c165761b7d38&code=${code}&grant_type=authorization_code`
  );
  const res = await axios.get(
    `https://api.weixin.qq.com/sns/userinfo?access_token=${weToken.data.access_token}&openid=${weToken.data.openid}&lang=zh_CN`
  );
  const one = Customer.findOne({
    name: res.data.nickname,
  });
 
  if (one.wechat) {
    one.wechat = weToken.data;
    await one.save();
  } else {
    const customer = new Customer({
      wechat: weToken.data,
      name: res.data.nickname,
      avator: res.data.headimgurl,
    });

    await customer.save();

    ctx.body = {
        code:1,
        data:customer,
        msg:'登录成功'
    }
  }
});

module.exports = router;
