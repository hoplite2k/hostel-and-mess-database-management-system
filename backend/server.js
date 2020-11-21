const express = require('express');
const STUDENTS = require('./data/students');
const EMPLOYEES = require('./data/employees');
const ROOMS = require('./data/rooms');

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/students', (req, res) => {
    res.json(STUDENTS);
});

app.get('/students/:id', (req, res) => {
    const student = STUDENTS.find((s) => s._id === req.params.id);
    res.json(student);
});

app.get('/employees', (req, res) => {
    res.json(EMPLOYEES);
});

app.get('/employees/:id', (req, res) => {
    const employee = EMPLOYEES.find((e) => e._id === req.params.id);
    res.json(employee);
});

app.get('/rooms', (req, res) => {
    res.json(ROOMS);
});

app.get('/rooms/:id', (req, res) => {
    const room = ROOMS.find((r) => r._id === req.params.id);
    res.json(room);
});

app.listen(5000, console.log("Server running on port 5000"));