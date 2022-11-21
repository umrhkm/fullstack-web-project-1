const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const questionSchema = new mongoose.Schema({
    pertanyaan: {
        type: String
    },
    pilihan: {
        type: []
    }
})

const quizSchema = new mongoose.Schema({
    name: String,
    quesitons: [questionSchema]
})

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    cost:{
        type: Number,
        required: true,
    },
    contentVideoUrls:{
        type: [],
        required: false
    },
    quizzes:{
        type: [quizSchema],
        required: false
    },
    approval_status: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const courseValidation = (request) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        cost: Joi.number().max(9999999).required(),
    })
    return schema.validate(request)
}

module.exports = mongoose.model('Course', courseSchema)
module.exports.courseValidation = courseValidation