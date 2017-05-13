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
var Vigenere = require('vigenere');
let passport = require('passport');
let Strategy = require('passport-twitter').Strategy;
let GitHubStrategy = require('passport-github').Strategy;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port',(process.env.PORT || 8086));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));



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

//----------------------------------------------- passport

function cleaner(str) {
    let tam = str.length;
    return str.substr(1,tam);
}
function adder(str) {
    try {
        console.log(str.length);
        let aux = str;
        str = [];
        str += ["-"];
        for (let i = 0; i <= str.length; i++) {
            str += [aux[i]];
        }
        return str;
    }
    catch(err){
        return null;
    }

}

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new Strategy({
    consumerKey: 'MHgOl757iTsvmUaX3nsvJwoCK',
    consumerSecret: 'UioRKHKZFMIGUmDJfPPUyNQzqsyk0TrcGPodT8lZ3ViXk2pH5Z',
    callbackURL: 'http://localhost:3001/login/twitter/return'
  },
  function (req, token, tokenSecret, profile, callback) {
    
      
          process.nextTick(function () {
            let nombre = '@' + profile.username
          User.findOne({
                  name      : nombre
              },
              function (err, user) {
                  if (err) {
                      callback(err);
                  }
                  if (user) { 
                      return callback(null, user);
                  } else { 
                      let pass = bcrypt.hashSync("twitter")
                      var newUser = new User({
                          name    : nombre,
                          password : pass
                          }
                      );
                      newUser.save(function(err, newUser, numAffected) {
                          if (err) {
                              console.log("Error when saving new user: ");
                              console.error(err);
                          }
                          return callback(null, newUser);
                      });
                  }
              }
          ); 
      });
  }));
  
  passport.use(new GitHubStrategy({
    clientID: '1db3c11f622dce53865c',
    clientSecret: 'aedc1432b6c85c022af69356e7735ee18c93beba',
    callbackURL: "http://localhost:3001/login/github/return"
  },
  function (req, token, tokenSecret, profile, callback) {
    
      
        
          process.nextTick(function () {
            let nombre = '#' + profile.username; 
          User.findOne({
                  name      : nombre
              },
              function (err, user) {
                  if (err) {
                      callback(err);
                  }
                  if (user) { 
                      return callback(null, user);
                  } else { 
                      let pass = bcrypt.hashSync("github")
                      var newUser = new User({
                          name    : nombre,
                          password : pass
                          }
                      );
                      newUser.save(function(err, newUser, numAffected) {
                          if (err) {
                              console.log("Error when saving new user: ");
                              console.error(err);
                          }
                          return callback(null, newUser);
                      });
                  }
              }
          ); 
      });
  }));
  
  
  
  

//-----------------------------------------------MODELOS

const User = require('./models/user.js');
const Event = require('./models/evento.js');
//-----------------------------------------------

let auth = function(req, res, next) {
    console.log("Entra en calendar");
    let aux = 0;
    console.log(req.session.user);
    User.findOne({
        'name': adder(req.session.user)
    }, function(err, obj) {
        console.log(obj);
        if ((obj == null) && (req.user.name[0] != '#') && (req.user.name[0] != '@')) { //Para saber si viene de un login passport
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
    if(req.session.user == null) {
        res.render('index.ejs');
    }
});


app.get('/login/twitter',
  passport.authenticate('twitter'));

app.get('/login/twitter/return', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
          res.redirect('/calendar')
});


app.get('/login/github',
  passport.authenticate('github'));
  
app.get('/login/github/return', 
      passport.authenticate('github', { failureRedirect: '/login' }),
      function(req, res) {
      
    res.redirect('/calendar')
});


app.post('/login', function(req, res) {
    console.log(req.body.name);
    User.findOne({
        'name': adder(req.body.name)
    }, function(err, obj) {  
        console.log(obj);
        try {
            if (err) return handleError(err);
            if (bcrypt.compareSync(req.body.password, obj.password)) {
                console.log("Usser y pass correctos");
                console.log("Success!!");
                req.session.user = req.body.name;
                res.redirect('/calendar')

            }
            else{
                res.render('index_error');
            }
        }
        catch(err){
            res.render('index_error');
        }
    })
});

app.post('/registro', function(req, res) {
    let pass = bcrypt.hashSync(req.body.password)
    let user = new User({
        "name": "-"+req.body.name,
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

app.get('/calendar',auth, function(req, res) {

    res.render('timeline.ejs');
    //res.send("Entra");
});


app.get('/profile',auth, function(req, res) {
 
    res.render('profile.ejs',{ name: req.session.user});
});

app.post('/profile', function(req, res) {
    let pass = bcrypt.hashSync(req.body.password)
    User.findOneAndUpdate({name: req.session.user},{$set:{password:pass}},{new: true},function(err,dox){
        res.render('profile_success',{ name: req.session.user});
    })
});

app.get('/calendar/create',auth, function(req, res) {

    res.render('create.ejs');
});
function find_id() {

}
app.post('/calendar/create',function (req,res) {

    let evento = new Event({

        "user" : req.session.user,
        "title": req.body.title,
        "date" : req.body.date,
        "hour" : req.body.hour,
        "description" : req.body.description,
    });

    console.log(evento);
    // evento.save(function(err) {
    //     console.log("Evento creado");
    // });

});


app.get('/calendar/edit/:id',auth, function(req, res) {
    console.log(req.params.id);

    Event.findOne({
            "_id"      : req.params.id,
        },function (err, event) {

            res.render('edit.ejs',{ user: event.user, title: event.title,date: event.date,hour: event.hour,description:event.description });

    });

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

