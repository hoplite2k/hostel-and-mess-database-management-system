import path from 'path';
import express from 'express';
import multer from 'multer';
const Uploadidentityrouter = express.Router();

const studentstorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'database/uploads/identity/students/');
    },
    filename(req, file, cb) {
        cb(
            null, `${file.originalname}`
        )
    },
})

const employeestorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'database/uploads/identity/employees/');
    },
    filename(req, file, cb) {
        cb(
            null, `${file.originalname}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const studentupload = multer({
    storage: studentstorage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
})

const employeeupload = multer({
    storage: employeestorage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
})

Uploadidentityrouter.post('/student', studentupload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})

Uploadidentityrouter.post('/employee', employeeupload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})

export default Uploadidentityrouter;