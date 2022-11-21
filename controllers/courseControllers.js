const User = require('../models/userModels')
const Course = require('../models/courseModels')
const { courseValidation } = require('../models/courseModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function create_course(req, res) {
    
    //Validasi Request
    const { error } = courseValidation(req.body)
    if (error) return res.status(400).send(error)

    //Menyimpan Data ke Database
    const new_course = new Course({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        cost: req.body.cost,
    });

    try {
        const savedCourse = await new_course.save();
        const updated_user = await User.updateOne({ _id: req.user._id }, {$set: {"myCourse": new_course._id}})
        res.send(updated_user);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function sign_in(req, res) {

    //Validasi Request
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({ "Error": error.details[0].message })

    //Menyocokkan Email Pada Database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(409).send({ "Error": "Email belum terdaftar" })

    //Validasi Password
    const validasiPw = await bcrypt.compare(req.body.password, user.password)
    if (!validasiPw) return res.status(401).send({ "Error": "Password salah" })

    //Membuat Token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY)
    res.header('autentikasi-token', token).send({ "Token": token })

}

module.exports.create_course = create_course