import asyncHandler from "express-async-handler";
import Employee from "../models/employeemodel.js";
import User from "../models/usermodel.js";
import nodemailer from 'nodemailer';

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({});

  res.json(employees);
});

const getEmployeebyId = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    const user = User.find({ id: employee.staffid });
    await user.remove();
    await employee.remove();
    res.json({ messsage: 'Employee Deleted ' });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

const addEmployee = asyncHandler(async (req, res) => {
  if (req.body) {
    const employee = new Employee({
      user: req.user._id,
      name: req.body.name,
      staffid: req.body.staffid,
      image: req.body.image,
      dob: req.body.dob,
      idproof: req.body.idproof,
      contact: req.body.contact,
      email: req.body.email,
      address: req.body.address,
      bloodgrp: req.body.bloodgrp,
      role: req.body.role,
      isadmin: req.body.isadmin
    });
    const newemployee = await employee.save();

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.ADMIN_MAIL_ID,
        pass: process.env.ADMIN_MAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.ADMIN_MAIL_ID,
      to: newemployee.email,
      subject: 'Welcome to the Hostel!',
      html: `<div style="font-family: Arial"><h1>Welcome</h1><p>Hello,</p><p>You have been successfully registerd as an Employee in the Hostel</p><p>You have your account in our portal, please change your password when you login for the first time</p><div><p>Credentials:</p><ul><li>user id: <em>${req.body.staffid}</em></li><li>password: <em>${process.env.USER_DEFAULT_PASSWORD}</em></li></ul></div></div>`
    };

    User.create({
      name: req.body.name,
      id: req.body.staffid,
      password: process.env.USER_DEFAULT_PASSWORD,
      isadmin: req.body.isadmin,
      employeeid: newemployee._id
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json(newemployee);
  } else {
    res.status(400);
    throw new Error('Could not add employee');
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {

    if (req.body.isadmin && req.body.isadmin !== employee.isadmin) {
      await User.findOneAndUpdate({ name: employee.name }, { isadmin: req.body.isadmin });
    }

    if (req.body.name && req.body.name !== employee.name) {
      await User.findOneAndUpdate({ name: employee.name }, { name: req.body.name });
    }

    employee.name = req.body.name || employee.name;
    employee.staffid = req.body.staffid || employee.staffid;
    employee.image = req.body.image || employee.image;
    employee.dob = req.body.dob || employee.dob;
    employee.idproof = req.body.idproof || employee.idproof;
    employee.contact = req.body.contact || employee.contact;
    employee.email = req.body.email || employee.email;
    employee.address = req.body.address || employee.address;
    employee.bloodgrp = req.body.bloodgrp || employee.bloodgrp;
    employee.role = req.body.role || employee.role;
    employee.isadmin = req.body.isadmin;

    const updatedemployee = await employee.save();
    res.json(updatedemployee);

  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});

export { getEmployeebyId, getEmployees, deleteEmployee, updateEmployee, addEmployee }