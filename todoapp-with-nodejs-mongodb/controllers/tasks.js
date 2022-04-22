// import Data Schema
const Task = require('../models/Task');

// refactoring
// GET(edit), POST(create), PATCH(update), DELETE(delete)
const getAllTasks = async (req, res) => {
  // Be careful await async error
  //
  // refactoring from
  // res.send('Get all tasks');
  //
  // try, catch are we are not sure to get a Data or not
  // test using postman GET ALL TODO, route from routes/tasks.js getAllTasks = app.js = /api/v1/tasks
  // result in postman
  try {
    const getAllTasks = await Task.find({}); // search from mongoose Document at API, Model, find() https://mongoosejs.com/docs/api/model.html#model_Model.find
    res.status(200).json(getAllTasks); // if it's success, we display getAllTasks with status(200)
  } catch (err) {
    res.status(500).json(err); // if it's fault, we display err with status(500)
  }
};

const createTask = async (req, res) => {
  // when we connect Database, it's always asynchronous processing / 非同期処理, so we need async and await
  // データベース接続は、素早くパパパッと接続できないので await, asyncが必要
  // res.send('create new task');
  //
  // mongoose Document API Model create() https://mongoosejs.com/docs/api/model.html#model_Model.create
  // await Character.create({ name: 'Jean-Luc Picard' });
  // try, catch are we are not sure to get a Data or not
  // test using postman CREATE TODO, route from routes/tasks.js createTask = app.js = /api/v1/tasks, add data in postman Body > row > JSON
  // { "name": "udemy", "completed":false }
  // result in mongoDB Database > View Monitoring > Collections  // if u had error in View Monitoring, just reload page or mongoDB refresh button
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json(createTask); // if it's success, we display createTask with status(200)
  } catch (err) {
    res.status(500).json(err); // if it's fault, we display err with status(500)
  }
};

const getSingleTask = async (req, res) => {
  // Be careful await async error
  //
  // res.send('get specific task');
  // search from mongoose Document at API, Model, findOne() https://mongoosejs.com/docs/api/model.html#model_Model.findOne
  // test using postman, GET SINGLE TODO, route from routes/tasks.js getSingleTask = app.js = /api/v1/tasks/:id
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id }); // req.params.id = :id from /api/v1/tasks/:id, if _id = mongoDB Single task id like a "6262d8ebcf497b95fac100f3" or not to check
    if (!getSingleTask) {
      return res.status(404).json(`_id:${req.params.id} is not exist`);
    }
    res.status(200).json(getSingleTask); // if it's success, we display getSingleTask with status(200)
  } catch (err) {
    res.status(500).json(err); // if it's fault, we display err with status(500)
  }
};

const updateTask = async (req, res) => {
  // res.send('update specific task');
  //
  // search from mongoose Document at API, Model, findOneAndUpdate()
  // https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate
  // test using postman UPDATE SINGLE TODO, route from routes/tasks.js updateTask = app.js = /api/v1/tasks/:id
  try {
    const updateTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body, // this Data will be update
      { new: true } // from mongoose Document "new" //  Options: new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
    ); // req.params.id = :id from /api/v1/tasks/:id, if _id = mongoDB Single task id like a "6262d8ebcf497b95fac100f3" or not to check
    if (!updateTask) {
      return res.status(404).json(`_id:${req.params.id} is not exist`);
    }
    res.status(200).json(updateTask); // if it's success, we display updateTask with status(200)
    // if not setup { new: true }, result in postman display previous data
  } catch (err) {
    res.status(500).json(err); // if it's fault, we display err with status(500)
  }
};

const deleteTask = async (req, res) => {
  // res.send('delete specific task');

  //
  // search from mongoose Document at API, Model, findOneAndDelete()
  // https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndDelete
  // test using postman UPDATE SINGLE TODO, route from routes/tasks.js deleteTask = app.js = /api/v1/tasks/:id
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id }); // req.params.id = :id from /api/v1/tasks/:id, if _id = mongoDB Single task id like a "6262d8ebcf497b95fac100f3" or not to check
    if (!deleteTask) {
      return res.status(404).json(`_id:${req.params.id} is not exist`);
    }
    res.status(200).json(deleteTask); // if it's success, we display deleteTask with status(200)
    // if not setup { new: true }, result in postman display previous data
  } catch (err) {
    res.status(500).json(err); // if it's fault, we display err with status(500)
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
