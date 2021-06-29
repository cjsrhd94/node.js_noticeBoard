const mongoose = require("mongoose");

const connect = () => {
  mongoose
    // .connect("mongodb://localhost:27017/admin", { //system 아래 admin으로 db생성.
    .connect("mongodb://localhost:27017/noticeBoard", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      // user: "test", // aws환경에서 권한문제가 발생할수 있어서 예방차원.
      // pass: "test"
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;