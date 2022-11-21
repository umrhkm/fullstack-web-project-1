const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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