const mongoose = require("mongoose");
require('./schemas/user');
require('./schemas/InviteCode');
require('./schemas/Order');
require('./schemas/Goods');
require('./schemas/InventoryLog')
require('./schemas/customer')
require('./schemas/character')
require('./schemas/Log')
require('./schemas/LogResponse')
require('./schemas/ForgetPassword')
require('./schemas/GoodsClassify')
require('./schemas/message')
const connect = () => {
  //去链接数据库
  return new Promise((resolve) => {
    mongoose.connect("mongodb://127.0.0.1:27017/water-mgr", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    mongoose.connection.on("open", () => {
      resolve();
    });
  });
};

module.exports = {
  connect,
};
