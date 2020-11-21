import express from 'express';
import dotenv from 'dotenv';
import STUDENTS from './data/students.js';
import EMPLOYEES from './data/employees.js';
import ROOMS from './data/rooms.js';

dotenv.config();

const app = express()

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));