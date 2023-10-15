// name: Jayden Nguyen, ID: 101363755

const express = require('express');
const employeeModel = require('../models/User');
const Employee = require('../models/User');

const routes = express.Router();

const users = [];

routes.post('/signup', (req, res) => {
  const user = req.body;

  if (!user || !user.username || !user.password) {
    res.status(400).json({ message: 'Username and password must be entered' });
  } else {
    const existingUser = users.find((u) => u.username === user.username);
    if (existingUser) {
      res.status(409).json({ message: 'usernames already entered' });
    } else {
      users.push(user);
      res.status(201).json({ message: 'User created good' });
    }
  }
});

routes.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (user && user.password === password) {
    res.status(200).json({
      status: true,
      username,
      message: 'User logged in good',
    });
  } else {
    res.status(400).json({
      status: false,
      message: 'Wrong Username and password',
    });
  }
});

module.exports = routes;
