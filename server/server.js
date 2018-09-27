const express = require('express');
const eventRouter = require('./routers/event.router');
const mongoose = require('mongoose');
const mongoURL = "mongodb://chhatrasal:chhatrasal09@ds261570.mlab.com:61570/events";
const path = require('path');
const  cors = require('cors');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.join(__dirname, '../src')));

app.use('/events/', eventRouter);

mongoose.connect(mongoURL, {useNewUrlParser: true});
let database = mongoose.connection;

database.on('error', console.error.bind(console, "MongoDB connection error : "));
database.on('connected', () => {
    app.listen(4000, (result, error) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(database);
            console.log("Server is up and running");
        }
    })
});
