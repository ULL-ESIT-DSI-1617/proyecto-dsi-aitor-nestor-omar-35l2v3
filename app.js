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
app.set('port',(process.env.PORT || 8086));
app.use(bodyParser.urlencoded({ extended: false }));


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

let User = new Schema({
    name            :   String,
    password        :   String

});
let User_m = mongoose.model('User', User);
//-----------------------------------------------

let auth = function(req, res, next) {
    let aux = 0;
    for (let i = 0; i < data.length; i++) {
        let user = data[i].username;
        if (req.session.user == user)
            aux = 1;

    }
    if (aux == 0){
        return res.redirect('/login');

    }
    else if(aux == 1){
        return next();
    }
};
app.get('/login',function (req,res) {
   res.render('index.ejs')
});
app.post('/registro',function (req,res) {
    let pass = bcrypt.hashSync(req.body.password)
    let user = new User_m ({"name":req.body.name, "password":pass});
    user.save(function (err) {
        if (err) return handleError(err);
        console.log("Success!!");
    })
    }
);
app.get('/calendar/*?',
    auth  // next only if authenticated
);
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

app.listen(3000);