const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const myCourseSchema = new mongoose.Schema({
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
        max: 9999999
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

const enrolledCourse = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const courseCostValidation = (request) => {
    const schema = Joi.object({
        cost: Joi.number().max(9999999).required()
    })
    return schema.validate(request.cost)
}


module.exports.enrolledCourse = enrolledCourse
module.exports.myCourseSchema = myCourseSchema
module.exports.courseCostValidation = courseCostValidation