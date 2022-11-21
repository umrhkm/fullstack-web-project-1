const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { number } = require('@hapi/joi');

const courseSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 8
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
        required: true
    },
    approval_status: {
        type: Boolean,
        required: true
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