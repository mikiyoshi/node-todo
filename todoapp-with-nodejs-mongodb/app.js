const express = require('express');
const app = express();
// routing design ルーティング設計
const taskRouter = require('./routes/tasks');
// connect Database
const connectDB = require('./db/connect');
// dotenv
require('dotenv').config();
// this is a post error form postman when POST data by JSON
app.use(express.json());
// setup Home page from ./public/index.html
app.use(express.static('./public'));

const PORT = 5000;

// routing design ルーティング設計
app.use('/api/v1/tasks', taskRouter);
// example: it's very helpful when we use authRouter and productRouter
// app.use('/api/v1/tasks', authRouter);
// app.use('/api/v1/tasks', productRouter);

// connect Database
// get URL from mongoDB and replace <password> and myFirstDatabase to test1234 and todoapp  // todoapp is new name
// connectDB is asynchronous processing / 非同期処理, so use async and await completed to get a data, then start other function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // this URL is not secure for now, we need update for illegibility / 非読性
    // update from connectDB() to connectDB(process.env.MONGO_URL)
    app.listen(PORT, console.log('Start localhost:5000'));
  } catch (err) {
    console.log(err);
  }
};
start();
