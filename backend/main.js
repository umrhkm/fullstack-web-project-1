const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes')
const finalProjectRoutes = require('./routes/finalProjectRoutes')
const cors = require('cors')

//Middleware
app.use(cors());
app.use(express.json());

//Route Middlewares
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/final-project', finalProjectRoutes);

app.listen(3000, () => console.log("Server is running"));