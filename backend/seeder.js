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

    const createdUsers = await User.insertMany(USERS);
    const adminUsers = createdUsers.filter((u) => u.isadmin === true);
    const firstadmin = adminUsers[0]._id;

    const students = STUDENTS.map((s) => {
      return { ...s, user: firstadmin };
    });
    await Student.insertMany(students);

    const employees = EMPLOYEES.map((e) => {
      return { ...e, user: firstadmin };
    });
    await Employee.insertMany(employees);

    const mess = MESS.map((m) => {
      return { ...m, user: firstadmin };
    });
    await Mess.insertMany(mess);

    const rooms = ROOMS.map((r) => {
      return { ...r, user: firstadmin };
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
