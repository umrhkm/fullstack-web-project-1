const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes')

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);

app.listen(3000, () => console.log("Server is running"));