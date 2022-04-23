// import axios in index.html is work or not test by console.log
// console.log(axios);

// get <div class="tasks"> from index.html
const tasksDOM = document.querySelector('.tasks');
// get <form class="task-form"> from index.html
const formDOM = document.querySelector('.task-form');
//get <input class="task-input" ... from index.html
const taskInputDOM = document.querySelector('.task-input');
//get <div class="form-alert"> from index.html
const formAlertDOM = document.querySelector('.form-alert');

// get all Data or tasks from /api/v1/tasks
const showTasks = async () => {
  // when we connect Database, it's always asynchronous processing / 非同期処理, so we need async and await
  // データベース接続は、素早くパパパッと接続できないので await, asyncが必要
  try {
    // get original API / 自作のAPIを叩く
    // const tasks = await axios.get('/api/v1/tasks'); // this data is get a all information, we need only data: information, so replace to { data: tasks }
    const { data: tasks } = await axios.get('/api/v1/tasks');
    // console.log(tasks);

    // id there is no tasks
    // console.log(tasks.length); // this is check task exist or not
    if (tasks.length < 1) {
      return (tasksDOM.innerHTML = `<h5 class="empty-list">No Task</h5>`);
    }
    // export all task
    const allTasks = tasks
      .map((task) => {
        // console.log(task); // we can check export all task
        const { completed, _id, name } = task; // this is Destructuring assignment / 分割代入
        // console.log(name); // test get name, result is "nodejs" and "udemy" same as console.log(tasks.name);
        // this is query parameter from <a href="edit.html?id=${_id}"
        // when completed: true, add Strike-through / 取り消し線, ${completed && 'task-completed'} is if completed: true, add Strike-through
        return `
      <div class="single-task ${completed && 'task-completed'}">
      <h5>
        <span><i class="fa fa-check-circle"></i></span>${name}
      </h5>
      <div class="task-links">
        <a href="edit.html?id=${_id}" class="edit-link"><i class="fa fa-edit"></i></a>
        <button type="button" class="delete-btn" data-id="${_id}"> 
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
      `;
      })
      .join(''); // .join('') remove ","
    // console.log(allTasks); // this is test to get a data from mongoDB
    tasksDOM.innerHTML = allTasks; // if not setup .join(''), there is a "," between each <div> elements like a <div class="single-task">...</div> , <div class="single-task">...</div>
  } catch (err) {
    console.log(err); // if it's fault, we display err with status(500)
  }
};

showTasks(); // display all task

// add new task
formDOM.addEventListener('submit', async (event) => {
  event.preventDefault(); // this is stop reload page when click submit button
  // get input text = new task name, this "name" use for POST await axios.post('/api/v1/tasks', { name: name })
  const name = taskInputDOM.value;
  try {
    await axios.post('/api/v1/tasks', { name: name }); // this is post name: "new post" from models/Task.js Schema
    showTasks();
    taskInputDOM.value = ''; // this is delete input text when click submit
    formAlertDOM.style.display = 'block'; // remove display="none"
    formAlertDOM.textContent = 'Add New Tasks'; // add success message at <div class="form-alert">
    formAlertDOM.classList.add('text-success'); // add class="text-success", cos default is class="form-alert"
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = 'block'; // remove display="none"
    formAlertDOM.innerHTML = 'Please add task within 20 characters'; // add error message at <div class="form-alert">
  }
  // if error message display, 3 sec later disappears
  setTimeout(() => {
    formAlertDOM.style.display = 'none'; // add display="none"
    formAlertDOM.classList.remove('text-success'); // remove class="text-success", return to default class="form-alert"
  }, 3000);
});

// delete task
tasksDOM.addEventListener('click', async (event) => {
  const element = event.target;
  // console.log(element); // this is a something 'click' can get data / クリックするとクリック部分のタグが表示される
  // console.log(element.parentElement); // this is a something 'click' can get data / クリックするとクリック部分の親のタグが表示される
  if (element.parentElement.classList.contains('delete-btn')) {
    // add data-id="${_id}" at <button type="button" class="delete-btn" data-id="${_id}"> in tasks.map((task)
    const id = element.parentElement.dataset.id;
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
