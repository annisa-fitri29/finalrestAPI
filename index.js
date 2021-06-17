const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/data');
const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect( process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
    console.log('connect to db!')
);

app.use(express.json());
app.use('/user', authRoute);
app.use('/datamhs', dataRoute);

app.listen(port, () => {
    console.log('Server up and running');
});

