const User = require('../models/userModels')
const Course = require('../models/courseModels')
const FinalProject = require('../models/finalProjectModels')
const { courseValidation } = require('../models/courseModels')
const { delete_final_project } = require('./finalProjectControllers')

async function create_course(req, res) {

    //Validasi Request
    const { error } = courseValidation(req.body)
    if (error) return res.status(400).send(error)

    const course = await Course.findOne({ name: req.body.name })
    if (course) return res.status(409).send({ "Pesan": "Nama kursus sudah digunakan" })

    const owner = await User.findOne({ email: req.user.email })

    //Menyimpan Data ke Database
    const new_course = new Course({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        cost: req.body.cost,
        owner_id: owner._id
    });

    try {
        const savedCourse = await new_course.save();
        const updated_user = await User.updateOne({ email: req.user.email }, { $addToSet: { "myCourse": new_course._id } })
        res.send({ "Pesan": "Kursus berhasil ditambahkan" });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function approve_course(req, res, id) {
    const course = await Course.findOne({_id: id})
    if (!course) return res.status(404).send({"Pesan" : "Course dengan ID tersebut tidak ditemukan"})

    const check_if_admin = req.user.email === "admin@gmail.com"
    if (!check_if_admin) return res.status(401).send({"Pesan" : "Anda tidak memiliki akses untuk melakukan hal ini"})

    try {
        const approving_course = await Course.updateOne({ _id: id }, { $set: { "approval_status": true } })
        const approved_course = await Course.findOne({ _id: id })
        res.send(approved_course)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_all_course(req, res) {
    try {
        res.send(await Course.find({}))
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_a_course(req, res, name) {
    const course = await Course.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } })
    if (!course) return res.status(404).send({"Pesan" : "Course dengan nama tersebut tidak ditemukan"})

    try {
        res.send(course)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function delete_course(req, res, id){
    const course = await Course.findOne({ _id: id })
    if (!course) return res.status(404).send({ "Pesan": "Course dengan ID tersebut tidak ditemukan" })

    const owner = await User.findOne({_id: course.owner_id})
    const isCourseOwner = req.user.email === owner.email
    if (!isCourseOwner) return res.status(401).send({ "Pesan": "Anda tidak memiliki akses terhadap course ini" })
    
    try {
        if (course.finalProjectID){
            await FinalProject.deleteOne({ _id: course.finalProjectID })
        }       
        const update_owner = await User.updateOne({ _id: owner._id}, { $pull: { myCourse: id } })
        const deleted_course = await Course.deleteOne({ _id: id })
        res.send({ "Pesan": "Kursus berhasil dihapus" })
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.create_course = create_course
module.exports.approve_course = approve_course
module.exports.get_all_course = get_all_course
module.exports.get_a_course = get_a_course
module.exports.delete_course = delete_course