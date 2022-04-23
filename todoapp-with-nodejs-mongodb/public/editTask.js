// get <p class="task-edit-id"> from edit.html
const taskIDDOM = document.querySelector('.task-edit-id');
// get <p class="task-edit-id"> from edit.html
const taskNameDOM = document.querySelector('.task-edit-name');
// get <form class="single-task-form" from edit.html
const editFormDOM = document.querySelector('.single-task-form');
// get <div class="form-alert"> from edit.html
const formAlertDOM = document.querySelector('.form-alert');
// get <input class="task-edit-completed" from edit.html
const taskCompletedDOM = document.querySelector('.task-edit-completed');

const params = window.location.search; // get a parameter data from <a href="edit.html?id=${_id}", but it's "?id=62635ac9393b60e3d7791fd7"
const id = new URLSearchParams(params).get('id'); // remove ?id= from "?id=62635ac9393b60e3d7791fd7", .get('id') means to get "id" parameter
console.log(params); // there is a search: has parameter of <a href="edit.html?id=${_id}", result is "?id=62635ac9393b60e3d7791fd7"
console.log(id); // result only id "62635ac9393b60e3d7791fd7"

// get single task
const showTask = async () => {
  try {
    // const task = await axios.get(`/api/v1/tasks/${id}`); // result Object { data: {}, status: 200, ...}
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`); // Destructuring assignment / 分割代入 // result Object { _id: "62635ac9393b60e3d7791fd7", name: "nodejs", completed: false, ...}
    // console.log(task);
    const { _id, completed, name } = task;
    taskIDDOM.textContent = _id; // add _id at <p class="task-edit-id"> from edit.html
    taskNameDOM.value = name; // add name at <input type="text" name="name" class="task-edit-name" /> from edit.html
    if (completed) {
      taskCompletedDOM.checked = true; // if checked: true, add checked status in <input class="task-edit-completed"
    }
  } catch (err) {
    console.log(err);
  }
};
showTask();

// edit task
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value; // get edited name: from <form class="single-task-form"
    taskCompleted = taskCompletedDOM.checked; // get edited completed: boolean from <input class="task-edit-completed"
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName, // add edited name
      completed: taskCompleted, // add edited boolean
    });
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'Update your edit';
    formAlertDOM.classList.add('text-success');
  } catch (err) {
    console.log(err);
  }

  // if message display, 3 sec later disappears
  setTimeout(() => {
    formAlertDOM.style.display = 'none'; // add display="none"
    formAlertDOM.classList.remove('text-success'); // remove class="text-success", return to default class="form-alert"
  }, 3000);
});
