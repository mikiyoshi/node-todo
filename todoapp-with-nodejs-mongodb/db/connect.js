const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose
    .connect(url) // if complete connect, next is .then()
    .then(() => console.log('connect mongoDB...')) // access from server to Database, .then() is asynchronous processing / 非同期処理
    .catch((err) => console.log(err));
};

module.exports = connectDB;
