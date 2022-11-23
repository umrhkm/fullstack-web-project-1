const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const conn = require('../database/db');
const { ObjectId } = require('mongodb');

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
    quizID:{
        type: [],
        required: false
    },
    finalProjectID:{
        type: ObjectId,
        required: false
    },
    approval_status: {
        type: Boolean,
        required: true,
        default: false
    },
    owner_id:{
        type:ObjectId,
        required:true
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

module.exports = conn.dbCourse.model('Course', courseSchema)
module.exports.courseValidation = courseValidation