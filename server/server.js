const express = require('express');
const eventRouter = require('./routers/event.router');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('./config/passport');
const mongoURL = "mongodb://chhatrasal:chhatrasal09@ds261570.mlab.com:61570/events";
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const app = express();

mongoose.Promise = global.Promise;

app.use(require('body-parser').json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));
// app.use(passport.initialize({
//     secret: 'Additi',
//     cookie: {
//         maxAge: 60000
//     },
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.session({
//     secret: 'Additi',
//     cookie: {
//         maxAge: 60000
//     },
//     resave: false,
//     saveUninitialized: false
// }))
app.use(session({
    secret: 'Additi',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));

app.use('/events/', eventRouter);
app.use('/auth/', require('./routers/auth.router'));

mongoose.connect(mongoURL, {useNewUrlParser: true});
let database = mongoose.connection;

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: err,
        },
    });
});
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
