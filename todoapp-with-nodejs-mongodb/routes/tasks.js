// routing design ルーティング設計
const express = require('express');
const router = express.Router();
// GET(edit), POST(create), PATCH(update), DELETE(delete)
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// replace from router.get('/api/v1/tasks/' to router.get('/', because '/api/v1/tasks/' is common parts of GET, POST, PATCH and DELETE
// and add app.use('/api/v1/tasks' at app.js

// refactoring getAllTasks from require('../controllers/tasks')
// router.get('/', (req, res) => {
//   res.send('Get all tasks');
// });
router.get('/', getAllTasks);

// refactoring createTask from require('../controllers/tasks')
// router.post('/', (req, res) => {
//   res.send('create new task');
// });
router.post('/', createTask);

// U can test in any :id like a http://localhost:5000/abc
// refactoring getSingleTask from require('../controllers/tasks')
// router.get('/:id', (req, res) => {
//   res.send('get specific task');
// });
router.get('/:id', getSingleTask);

// refactoring updateTask from require('../controllers/tasks')
// router.patch('/:id', (req, res) => {
//   res.send('update specific task');
// });
router.patch('/:id', updateTask);

// router.delete('/:id', (req, res) => {
//   res.send('delete specific task'); // refactoring deleteTask from require('../controllers/tasks')
// });
router.delete('/:id', deleteTask);

module.exports = router;
