const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const koaRouter = require("koa-router");
const router = new koaRouter();
const db = require("./db.json");
const cors = require("@koa/cors");

//Json prettier middelware...
app.use(json());

//allow Access-Control-Allow-Origin with koa
app.use(cors());

// creating simple api
router.get("/table", (ctx) => {
  const data = db;
  if (data) {
    ctx.status = 200;
    ctx.body = data;
  } else {
    ctx.status = 501;
    ctx.body = { msg: "somthis went wrong!" };
  }
});

//Router middelware
app.use(router.routes());
app.use(router.allowedMethods());

//server port
const port = 5000;

app.listen(port, () => console.log("server is listening port:", port));
