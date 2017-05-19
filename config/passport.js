let passport = require('passport');
let Strategy = require('passport-twitter').Strategy;
let GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user.js');


module.exports = function(passport) {
  

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
    
}