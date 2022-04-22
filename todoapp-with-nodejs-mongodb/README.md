# asynchronous processing / 非同期処理

- 電子レンジで温める
- 皿洗う
- 洗濯する
- async function(){microwave heat} = req
  - wash dish
  - do laundry
- await pasta = res

| Client     | Server / node.js | DataBase / mongoDB |
| ---------- | ---------------- | ------------------ |
|            | async function() | async function()   |
| await data | await data       |                    |

Why we use asynchronous processing?
Because it takes a long time to response Data from Database / mongoDB

# Todo App

| Client | Server / node.js | DataBase / mongoDB |
| ------ | ---------------- | ------------------ |
|        | postman (axios)  | mongoose           |

npm init -y

Update package.json
"main": "app.js",
"dev": "nodemon app.js"

npm i express nodemon

# routing design ルーティング設計

| file                 | import                                                | export                              |
| -------------------- | ----------------------------------------------------- | ----------------------------------- |
| app.js               | const taskRouter = require('./routes/tasks')          |                                     |
|                      | app.use('/api/v1/tasks', taskRouter)                  |                                     |
| routes/tasks.js      |                                                       | const router = express.Router()     |
|                      | const {getAllTasks} = require('../controllers/tasks') |                                     |
|                      | router.get('/', getAllTasks)                          |                                     |
| controllers/tasks.js |                                                       | const getAllTasks = (req, res) => { |

# mongoDB

- create new database
- free account
- create username / password
- add entry
- created new Cluster0 database

## Type of Data

- name: string / text
- completed: boolean / true, false
- id: number

## Library mongoose

[mongoose](https://mongoosejs.com/docs/index.html)

```
npm i mongoose
```

| Client      | Server / node.js    | DataBase / mongoDB |
| ----------- | ------------------- | ------------------ |
|             | postman POST method | mongoose           |
| postman res |                     | mongoose           |
