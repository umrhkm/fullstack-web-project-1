const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes');

dotenv.config();

//Connect DB
mongoose.connect(
    process.env.DATABASE_URL,  
    { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', userRoutes);

app.listen(3000, () => console.log("Server is running"));