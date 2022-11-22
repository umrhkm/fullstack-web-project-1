const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

//Connect DB
mongoose.dbUser = mongoose.createConnection(
    process.env.USER_DATABASE_URL,  
    { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.dbCourse = mongoose.createConnection(
    process.env.COURSE_DATABASE_URL,  
    { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose