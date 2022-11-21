const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { myCourseSchema, enrolledCourse } = require('./courseModels')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    myCourse: {
        type: [myCourseSchema],
        required: false,
        default: []
    },
    enrolledCourse: {
        type: [enrolledCourse],
        default: [],
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})



const signUpValidation = (request) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(request)
}

const loginValidation = (request) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(request)
}

module.exports = mongoose.model('User', userSchema)
module.exports.signUpValidation = signUpValidation
module.exports.loginValidation = loginValidation
