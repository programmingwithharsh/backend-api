const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./queries");
const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// GET API, http://localhost:4200
app.get('/', function (req, res) {
    res.json({ info: "PostgreSQ API" });
})

app.get('/users', db.getUsers); // http://localhost:4200/users
app.get('/users/:id', db.getUserById);  // http://localhost:4200/users/5

app.post('/users', db.createUser); // http://localhost:4200/users
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(4200);