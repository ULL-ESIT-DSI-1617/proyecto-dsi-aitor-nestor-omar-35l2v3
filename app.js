"use strict";

let express = require('express'),
    app = express(),
    session = require('express-session');
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");
var jsonfile = require('jsonfile')
var bodyParser = require('body-parser');
let bcrypt = require("bcrypt-nodejs");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8086));
app.use(bodyParser.urlencoded({
    extended: false
}));


let mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/dsi');


//(var parsedJSON = JSON.parse(data);

//-----------------------------------------------COOKIES Y SESSIONS
app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

//-----------------------------------------------MODELOS

const User = require('./models/user.js');
//-----------------------------------------------

let auth = function(req, res, next) {
    console.log("Entra en calendar");
    let aux = 0;
    console.log(req.session.user);
    User.findOne({
        'name': req.session.user
    }, function(err, obj) {
        console.log(obj);
        if (obj == null) {
            console.log("No hay user en la session");
            aux = 0;
        } else {
            console.log("Hay user en la session");
            aux = 1;
        }
        if (aux == 0) {
            return res.redirect('/login');

        } else {
            console.log("aux =1");
            return next();
        }

    });

};

app.use(express.static('./public'));

app.get('/login', function(req, res) {
    res.render('index.ejs');
});

app.post('/login', function(req, res) {
    console.log(req.body.name);
    User.findOne({
        'name': req.body.name
    }, function(err, obj) {
        console.log(obj);
        if (err) return handleError(err);
        if (bcrypt.compareSync(req.body.password, obj.password)) {
            console.log("Usser y pass correctos");
            console.log("Success!!");
            req.session.user = req.body.name;
            res.redirect('/calendar')

        }
    })
});

app.post('/registro', function(req, res) {
    let pass = bcrypt.hashSync(req.body.password)
    let user = new User({
        "name": req.body.name,
        "password": pass
    });
    user.save(function(err) {
        if (err) return handleError(err);
        console.log("Success!!");
        req.session.user = req.body.name;
        res.redirect('/calendar')
    })
});
app.get('/session', function(req, res) {

    console.log(req.session.user);


});
app.get('/calendar',
    auth // next only if authenticated
);
app.get('/calendar', function(req, res) {

    res.render('timeline.ejs');
    //res.send("Entra");
});

app.get('/profile',
    auth // next only if authenticated
);
app.get('/profile', function(req, res) {

    res.render('profile.ejs');
});


/*
app.use(login);

app.get('', function (req, res) {
    res.send('Hello World!');
});
app.get('/hello', function (req, res) {
    res.send('Hello World!');
});
app.post('/login',function (req,res) {
    next();
});*/

app.listen(3001);