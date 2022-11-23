const User = require('../models/userModels')
const FinalProject = require('../models/finalProjectModels')
const Course = require('../models/courseModels')

async function create_final_project(req, res) {

    //Menyimpan Data ke Database
    const new_final_project = new FinalProject({
        name: req.body.name,
        courseID: req.body.courseID,
        questionCase: req.body.questionCase,
    });

    try {
        const savedFinalProject = await new_final_project.save();
        const updated_course = await Course.updateOne({ _id: new_final_project.courseID }, { $set: { "finalProjectID": new_final_project._id } })
        res.send({ "Pesan": "Final project berhasil ditambahkan" });
    } catch (err) {
        res.status(400).send(err);
    }
}

async function grade_final_project(req, res, id_finalProject, id_user) {
    const final_project = await FinalProject.findOne({ _id: id_finalProject })

    const course = await Course.findOne({ _id: final_project.courseID })

    const owner = await User.findOne({ _id: course.owner_id })

    const validasi_owner = req.user.email === owner.email

    if (!validasi_owner) return res.status(401).send({ "Error": "Anda tidak memiliki akses untuk menilai final project ini" })

    try {
        const grading_final_project_answer = await FinalProject.updateOne({ _id: id_finalProject, "answer.id_user": id_user }, { $set: { "answer.$.score": req.body.score } })
        const garded_final_project_answer = await FinalProject.findOne({ _id: id_finalProject })
        res.send(garded_final_project_answer)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function add_answer(req, res, id_finalProject) {
    const final_project = await FinalProject.findOne({ _id: id_finalProject })

    const user = await User.findOne({ email: req.user.email })

    try {
        const adding_answer = await FinalProject.updateOne({ _id: final_project._id }, { $addToSet: { "answer": { id_user: user._id, answer: req.body.answer } } })
        const answered_final_project = await FinalProject.findOne({ _id: final_project._id, 'id_user': user._id })
        res.send(answered_final_project)
    } catch (err) {
        res.status(400).send(err)
    }

}

async function get_all_final_project(req, res) {
    try {
        res.send(await FinalProject.find({}))
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_a_final_project(req, res, id) {
    try {
        res.send(await FinalProject.find({ _id: id }))
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_final_project_by_course(req, res, id_course) {
    try {
        res.send(await FinalProject.findOne({ courseID: id_course }))
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_final_project_answers(req, res, id_final_project) {
    try {
        const final_project = await FinalProject.find({ _id: id_final_project })
        res.send(final_project.answer)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_a_final_project_answer(req, res, id_final_project, id_user){
    try {
        const final_project = await FinalProject.findOne({ _id: id_final_project, "answer.id_user": id_user })
        res.send(final_project.answer)
    } catch (err) {
        res.status(400).send(err)
    }
}

async function get_a_final_project_score(req, res, id_final_project, id_user){
    try {
        const final_project = await FinalProject.findOne({ _id: id_final_project, "answer.id_user": id_user })
        res.send(final_project.answer[0].score.toString())
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports.create_final_project = create_final_project
module.exports.grade_final_project = grade_final_project
module.exports.add_answer = add_answer
module.exports.get_all_final_project = get_all_final_project
module.exports.get_a_final_project = get_a_final_project
module.exports.get_final_project_by_course = get_final_project_by_course
module.exports.get_a_final_project_answer = get_a_final_project_answer
module.exports.get_final_project_answers = get_final_project_answers
module.exports.get_a_final_project_score = get_a_final_project_score