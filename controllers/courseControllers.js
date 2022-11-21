const User = require('../models/userModels')
const Course = require('../models/courseModels')
const { courseValidation } = require('../models/courseModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function create_course(req, res) {
    
    //Validasi Request
    const { error } = courseValidation(req.body)
    if (error) return res.status(400).send(error)

    const course = await Course.findOne({ name: req.body.name })
    if (course) return res.status(409).send({ "Error": "Nama kursus sudah digunakan" })

    //Menyimpan Data ke Database
    const new_course = new Course({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        cost: req.body.cost,
    });

    try {
        const savedCourse = await new_course.save();
        const updated_user = await User.updateOne({ _id: req.user._id }, {$addToSet: {"myCourse": new_course._id}})
        res.send({"Pesan" : "Kursus berhasil ditambahkan"});
    } catch (err) {
        res.status(400).send(err);
    }
}

async function approve_course(req, res, id) {
    try {
        const approving_course = await Course.updateOne({ _id: id }, {$set: {"approval_status": true}})
        const approved_course = await Course.findOne({_id:id})
        res.send(approved_course)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_all_course(req,res){
    try {
        res.send(await Course.find({}))
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_a_course(req,res,name){
    try {
        res.send(await Course.find({name: { $regex: '.*' + name + '.*', $options:'i' }}))
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.create_course = create_course
module.exports.approve_course = approve_course
module.exports.get_all_course = get_all_course
module.exports.get_a_course = get_a_course