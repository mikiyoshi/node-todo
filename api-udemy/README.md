npm init
npm i express
npm i nodemon
add package.json

"dev":"nodemon index.js"

npm run dev

[Hello World の例](https://expressjs.com/ja/starter/hello-world.html)

[POSTMAN](https://www.postman.com/)
basic.js

# mongoDB

document oriented ドキュメント指向型 / JSON file

- Pros
  - Dynamic schema configuration 動的スキーマ設定
  - Can handle even large amounts of data 大容量データでも捌ける
  - Don't need SQL method, No SQL SQL 文知らなくても使える
- Cons / Pros of SQL or postageSQL
  - it's weak search engin データ検索に弱い
  - Data inconsistency is not maintained データの一貫性が保てない

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
