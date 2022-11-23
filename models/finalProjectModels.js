const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const conn = require('../database/db');
const { ObjectId } = require('mongodb');

const finalProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courseID:{
        type: ObjectId,
        required: true,
    },
    questionCase: {
        type: String,
        required: true,
    },
    answer:{
        type: [{
            id_user: {
                type: ObjectId,
                required: true,
            },
            answer: {
                type:String,
                reqired: true
            },
            score:{
                type: Number,
                required: false,
                max : 100,
                min: 0
            }
        }],
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = conn.dbFinalProject.model('FinalProject', finalProjectSchema)