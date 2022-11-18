const db = require("./db.json");

exports.getTableList = async (ctx) => {
  const data = db;
  if (data) {
    ctx.status = 200;
    ctx.body = data;
  } else {
    ctx.status = 500;
    ctx.body = { msg: "somthing went wrong!" };
  }
};
