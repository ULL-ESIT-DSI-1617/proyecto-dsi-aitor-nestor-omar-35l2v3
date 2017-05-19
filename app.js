"use strict";

let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");
let jsonfile = require('jsonfile');
let bodyParser = require('body-parser');
let bcrypt = require("bcrypt-nodejs");
let Vigenere = require('vigenere');
let passport = require('passport');
var pjax = require('express-pjax-middleware');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(pjax());
app.set('port',(process.env.PORT || 8086));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

require('./config/passport.js')(passport);


let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/dsi');

app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



const User = require('./models/user.js');
const Event = require('./models/evento.js');


app.use(express.static('./public'));
app.get('/login', function(req, res) {
    if(req.session.user == null) {
        res.render('index.ejs');
    }
});

require('./config/routes.js')(app,passport);

app.listen(3001);

