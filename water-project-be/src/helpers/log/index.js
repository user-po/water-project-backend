const { verify, getToken } = require("../token");
const mongoose = require("mongoose");

const Log = mongoose.model("Log");
const LogResponse = mongoose.model("LogResponse");
const logMiddleWare = async (ctx, next) => {
  const startTime = Date.now();

  await next();

  const endTime = Date.now();
  let payLoad = {};

  try {
    payLoad = await verify(getToken(ctx));
  } catch {
    payLoad = {
      account: "未知用户",
      id: "",
    };
  }

  const url = ctx.url;
  const method = ctx.method;
  const status = ctx.status;
  let show = true;
  if (url === "/log/delete") {
    show = false;
  }
  let resopnseBody = "";

  if (typeof ctx.body === "string") {
    resopnseBody = ctx.body;
  } else {
    try {
      resopnseBody = JSON.stringify(ctx.body);
    } catch {
      resopnseBody = "";
    }
  }
  const log = new Log({
    user: {
      account: payLoad.account,
      id: payLoad.id,
    },
    request: {
      url,
      method,
      status,
    },
    endTime,
    startTime,
    show,
  });

  await log.save();
  const logRes = new LogResponse({
    logId: log._id,
    data: resopnseBody,
  });

  logRes.save();
};

module.exports = {
  logMiddleWare,
};
