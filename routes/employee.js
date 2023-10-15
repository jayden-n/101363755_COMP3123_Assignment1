// name: Jayden Nguyen, ID: 101363755

const express = require('express');
const employeeModel = require('../models/Employee');
const Employee = require('../models/Employee');

const routes = express.Router();
const employeeList = [];

routes.get('/employees', async (req, res) => {
  try {
    const employeeList = await employeeModel.find({});
    res.status(200).send(employeeList);
  } catch (error) {
    res.status(500).send(employeeList);
  }
});

routes.post('/employees', async (req, res) => {
  try {
    const newEmployee = new employeeModel({
      ...req.body,
    });
    await newEmployee.save();
    res.status(200).send(newEmployee);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/employees/:employeeid', async (req, res) => {
  const employeeId = req.params.employeeid;

  try {
    const employee = await Employee.findById(employeeId);

    if (employee) {
      res.status(200).json({ message: 'Employee founded', data: employee });
    } else {
      res.status(404).json({ message: 'Employee not found 404' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal error' });
  }
});

routes.put('/employees/:employeeid', async (req, res) => {
  const employeeId = req.params.employeeid;
  const updatedData = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updatedData,
      { new: true }
    );

    if (updatedEmployee) {
      res.status(200).json({
        message: 'Employee updated :)',
        data: updatedEmployee,
      });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal error' });
  }
});

routes.delete('/employees/:employeeid', async (req, res) => {
  try {
    const employee = await employeeModel.deleteOne({
      _id: req.params.employeeid,
    });

    if (!employee) {
      res.status(200).send({ message: 'Employee missing' });
    } else {
      res.status(200).send(employee);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = routes;
