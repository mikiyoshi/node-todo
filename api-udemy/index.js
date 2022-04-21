const express = require('express');
const nodemon = require('nodemon');
const app = express();
const port = 5000;
// postman send a data by json
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// this is a endpoint of node.js server
// app.get('/' is localhost:5000/ is endpoint
// client: send localhost:5000/ > req = request to server: app.get('/'
// server: res=response > client: res.send('Hello World!')
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Don't forget 'Mickey', this is error { title: Mickey, id: 1 }
// { title: 'Mickey', id: 1 },
const customers = [
  { title: 'Mickey', id: 1 },
  { title: 'Peter', id: 2 },
  { title: 'John', id: 3 },
  { title: 'Ted', id: 4 },
  { title: 'Robbie', id: 5 },
  { title: 'Micheal', id: 6 },
];

// this is display API data at localhost:5000/api/customers
app.get('/api/customers', (req, res) => {
  res.send(customers);
});

app.post('/api/customers', (req, res) => {
  // get new customer data
  const customer = {
    title: req.body.title,
    id: customers.length + 1,
  };
  // add customers array
  customers.push(customer);
  // display display API data at localhost:5000/api/customers
  res.send(customer);
});

// postman
// client > req > node.js server
// client < res < node.js server
// how to send a GET, POST, PUT, DELETE method????
// postman can use GET, POST, PUT, DELETE method
//
// setup postman
// https://www.postman.com/
// create account, download app for local user
// POST at postman
// localhost:5000/api/customers
// body, json
// add sample data
// {  "title": "Nick"}
// send > u can get result
// GET at postman
// localhost:5000/api/customers
// send > u can get result

// Edit
app.put('/api/customers/:id', (req, res) => {
  // customers array put in (c)
  // (req.params.id) = :id from app.put('/api/customers:id'
  // if same id return to customer = customers.find
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  // req.body.title from postman PUT data
  customer.title = req.body.title;
  res.send(customer);
});
// PUT at postman
// localhost:5000/api/customers/3
// {  "title": "Woody"}
// send > u can get result
// GET at postman
// localhost:5000/api/customers
// send > u can get result

// Delete
app.delete('/api/customers/:id', (req, res) => {
  // same as Edit
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  // .indexOf is return from customers Array at specific index number of .indexOf(customer)
  const index = customers.indexOf(customer);
  // .splice is delete from customers Array
  // .splice(index, 1) index is specific index number and 1 is 1 Array
  customers.splice(index, 1);
  res.send(customer);
});
