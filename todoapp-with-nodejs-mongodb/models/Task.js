// Schema
// https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'add task name'], // this is required for input form
    trim: true, // this remove blank space
    maxlength: [20, 'Task name is limited to 20 characters'],
  },
  completed: {
    type: Boolean, // this is true or false
    default: false, // this is a todo task status, when add new task, task is not completed = false
  },
  // we don't need set up "id", cos id is auto update
});

module.exports = mongoose.model('Task', TaskSchema); // we can get TaskSchema anywhere, so we can control GET(edit), POST(create), PATCH(update), DELETE(delete) using TaskSchema
