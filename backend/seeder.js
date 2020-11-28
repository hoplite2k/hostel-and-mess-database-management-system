import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import USERS from "./data/users.js";
import EMPLOYEES from "./data/employees.js";
import STUDENTS from "./data/students.js";
import MESS from "./data/mess.js";
import ROOMS from "./data/rooms.js";
import User from "./models/usermodel.js";
import Employee from "./models/employeemodel.js";
import Student from "./models/studentmodel.js";
import Mess from "./models/messmodel.js";
import Room from "./models/roommodel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Student.deleteMany();
    await Employee.deleteMany();
    await Mess.deleteMany();
    await Room.deleteMany();
    await User.deleteMany();

    const admins = EMPLOYEES.filter((e) => e.isadmin === true);
    const adminUsers = await Employee.insertMany(admins);
    const firstadmin = adminUsers[0]._id;

    const students = STUDENTS.map((s) => {
      return { ...s, user: firstadmin };
    });
    const createdStudents = await Student.insertMany(students);

    const EMPLOYEESTEMP = EMPLOYEES.filter((e) => e.isadmin === false);
    const employees = EMPLOYEESTEMP.map((e) => {
      return { ...e, user: firstadmin };
    });
    const createdEmployees = await Employee.insertMany(employees);

    const users = USERS.map((u) => {
      var emp = createdEmployees.find((e) => e.staffid === u.id);
      if(emp === undefined){
        emp = adminUsers.find((e) => e.staffid === u.id);
      }
      return { ...u, employeeid: emp._id };
    });
    await User.insertMany(users);

    const mess = MESS.map((m) => {
      return { ...m, user: firstadmin };
    });
    await Mess.insertMany(mess);

    const rooms = ROOMS.map((r) => {
      const inmates = createdStudents.filter((s) => s.roomno === r.roomno);
      if(inmates.length === 2)
        return { ...r, user: firstadmin, student1: inmates[0]._id , student2: inmates[1]._id };
      else if(inmates.length === 1)
        return { ...r, user: firstadmin, student1: inmates[0]._id, student2: null };
      else
        return { ...r, user: firstadmin, student1: null , student2: null };
    });
    await Room.insertMany(rooms);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Student.deleteMany();
    await Employee.deleteMany();
    await Room.deleteMany();
    await Mess.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
