// name: Jayden Nguyen, ID: 101363755

const express = require('express');
const employeesRoutes = require('./routes/employee');
const usersRoutes = require('./routes/user');
const mongoose = require('mongoose');

const app = express();

const SERVER_PORT = 3005;

app.use(express.json());
app.use(express.urlencoded());

const DB_CONNECTION_STRING =
  'mongodb+srv://week6lab:7q9Vd6hJEoRKU3a7@cluster0.gbwpvll.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority';

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/v1/emp', employeesRoutes);
app.use('/api/v1/user', usersRoutes);

app.route('/').get((req, res) => {
  res.send('<h1>Assignment1 - Jayden Nguyen</h1>');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running at port: ${SERVER_PORT}`);
});
