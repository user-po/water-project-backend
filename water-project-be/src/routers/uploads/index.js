const Router = require("@koa/router");
const { v4: uuid } = require("uuid");
const multer = require('@koa/multer')
const path =require('path')
const router = new Router({
  prefix: "/upload",
});
var changedName;
let storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    
    cb(null, path.resolve(__dirname, '../../../upload'))
  },
  //修改文件名称
  filename: function (req, file, cb) {
    
    changedName = (uuid())+'-'+file.originalname;
    cb(null, changedName);
  }
})
//加载配置
let upload = multer({ storage: storage });
router.post("/file", upload.single('excel'),async (ctx) => {
  // const ext = getUploadFileExt(ctx);
  // const filename = `${uuid()}.${ext}`;
  // await saveFileToDisk(
  //   ctx,
  //   path.resolve(config.UPLOAD_DIR, filename)
  // );
  
  ctx.body = {
    data: changedName,
    msg: "上传成功",
    code: 1,
  };
});
module.exports = router;
