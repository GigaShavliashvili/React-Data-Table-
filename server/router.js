const koaRouter = require("koa-router");
const router = new koaRouter();
const {getTableList} = require("./controler")


router.get("/", getTableList);



module.exports = router;