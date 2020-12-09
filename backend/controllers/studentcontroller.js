import asyncHandler from "express-async-handler";
import Student from "../models/studentmodel.js";
import Room from "../models/roommodel.js";

const getallStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({}).sort({ ispassedout: 1, year: 1, name: 1 });

    res.json(students);
});

const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({ ispassedout: false }).sort({ year: 1, name: 1 });

    res.json(students);
});

const getStudentbyId = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
        res.json(student);
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
        if (student.roomateusn === "") {
            await Student.findOneAndUpdate({ usn: student.roomateusn }, { roomatename: "", roomateusn: "" });
        }
        await Room.findOneAndUpdate({ roomno: student.roomno }, { $pull: { inmates: student._id } });
        await student.remove();
        res.json({ messsage: 'Student Deleted ' });
    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

const addStudent = asyncHandler(async (req, res) => {
    if (req.body) {
        const student = new Student({
            user: req.user._id,
            name: req.body.name,
            usn: req.body.usn,
            image: req.body.image,
            branch: req.body.branch,
            year: req.body.year,
            roomno: req.body.roomno,
            roomatename: req.body.roomatename,
            roomateusn: req.body.roomateusn,
            dob: req.body.dob,
            idproof: req.body.idproof,
            contact: req.body.contact,
            email: req.body.email,
            address: req.body.address,
            feespaid: req.body.feespaid,
            feesdue: req.body.feesdue,
            penalties: req.body.penalties,
            firstyear: req.body.firstyear,
            finalyear: req.body.finalyear,
            bloodgrp: req.body.bloodgrp,
            ispassedout: req.body.ispassedout,
            parents: {
                fname: req.body.parents.fname,
                mname: req.body.parents.mname,
                address: req.body.parents.address,
                email: req.body.parents.email,
                contact: req.body.parents.contact,
            }
        });
        const newstudent = await student.save();
        if (req.body.roomno) {
            await Room.findOneAndUpdate({ roomno: req.body.roomno }, { $push: { inmates: newstudent._id } });
        }
        res.status(201).json(newstudent);
    } else {
        res.status(400);
        throw new Error('Could not add student');
    }
});

const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (student) {

        if (req.body.roomno && req.body.roomno !== student.roomno) {
            await Room.findOneAndUpdate({ roomno: student.roomno }, { $pull: { inmates: student._id } });
            await Room.findOneAndUpdate({ roomno: req.body.roomno }, { $push: { inmates: student._id } });
        }

        student.name = req.body.name || student.name;
        student.usn = req.body.usn || student.usn;
        student.image = req.body.image || student.image;
        student.branch = req.body.branch || student.branch;
        student.year = req.body.year || student.year;
        student.roomno = req.body.roomno || student.roomno;
        student.roomatename = req.body.roomatename || student.roomatename;
        student.roomateusn = req.body.roomateusn || student.roomateusn;
        student.dob = req.body.dob || student.dob;
        student.idproof = req.body.idproof || student.idproof;
        student.contact = req.body.contact || student.contact;
        student.email = req.body.email || student.email;
        student.address = req.body.address || student.address;
        student.feespaid = req.body.feespaid || student.feespaid;
        student.feesdue = req.body.feesdue || student.feesdue;
        student.penalties = req.body.penalties || student.penalties;
        student.firstyear = req.body.firstyear || student.firstyear;
        student.finalyear = req.body.finalyear || student.finalyear;
        student.bloodgrp = req.body.bloodgrp || student.bloodgrp;
        student.ispassedout = req.body.ispassedout || student.ispassedout;
        if (req.body.parents) {
            student.parents.fname = req.body.parents.fname || student.parents.fname;
            student.parents.mname = req.body.parents.mname || student.parents.mname;
            student.parents.address = req.body.parents.address || student.parents.address;
            student.parents.email = req.body.parents.email || student.parents.email;
            student.parents.contact = req.body.parents.contact || student.parents.contact;
        }

        const updatedstudent = await student.save();
        res.json(updatedstudent);

    } else {
        res.status(404);
        throw new Error("Student not found");
    }
});

const searchStudents = asyncHandler(async (req, res) => {
    if (req.body) {
        console.log(req.body.ispassedout);
        var dict = {};
        if (req.body.name) { const name = req.body.name; if (name !== '') { dict['name'] = name; } }
        if (req.body.usn) { const usn = req.body.usn; if (usn !== '') { dict['usn'] = usn; } }
        if (req.body.branch) { const branch = req.body.branch; if (branch !== '') { dict['branch'] = branch; } }
        if (req.body.year) { const year = req.body.year; if (year !== '') { dict['year'] = year; } }
        if (req.body.roomno) { const roomno = req.body.roomno; if (roomno !== '') { dict['roomno'] = roomno; } }
        if (req.body.contact) { const contact = req.body.contact; if (contact !== '') { dict['contact'] = contact; } }
        if (req.body.email) { const email = req.body.email; if (email !== '') { dict['email'] = email; } }
        if (req.body.bloodgrp) { const bloodgrp = req.body.bloodgrp; if (bloodgrp !== '') { dict['bloodgrp'] = bloodgrp; } }
        if (req.body.feespaid) { const feespaid = Number(req.body.feespaid); if (req.body.feespaid !== '') { dict['feespaid'] = { $gte: feespaid }; } }
        if (req.body.feesdue) { const feesdue = Number(req.body.feesdue); if (req.body.feesdue !== '') { dict['feesdue'] = { $gte: feesdue }; } }
        if (req.body.penalties) { const penalties = Number(req.body.penalties); if (req.body.penalties !== '') { dict['penalties'] = { $gte: penalties }; } }
        if (req.body.firstyear) { const firstyear = Number(req.body.firstyear); if (req.body.firstyear !== '') { dict['firstyear'] = firstyear; } }
        if (req.body.ispassedout && req.body.ispassedout !== '') { const ispassedout = req.body.ispassedout === 'YES' ? true : false; dict['ispassedout'] = ispassedout; }

        const students = await Student.find(dict).sort({ ispassedout: 1, year: 1, name: 1 });

        if (students.length > 0)
            res.status(201).json(students);
        else
            res.status(404).json(dict);
    } else {
        res.status(400);
        throw new Error('Could not find students');
    }
});

export { getStudentbyId, getStudents, deleteStudent, updateStudent, addStudent, searchStudents, getallStudents };