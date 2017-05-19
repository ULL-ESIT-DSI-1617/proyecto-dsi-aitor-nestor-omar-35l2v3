let passport = require('passport');
let Strategy = require('passport-twitter').Strategy;
let GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user.js');
let config = require('./auth')
let twStrategy = config.twitterAuth;
let ghStrategy = config.githubAuth;

module.exports = function(passport) {
  

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });



    passport.use(new Strategy(twStrategy,
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
  
    passport.use(new GitHubStrategy(ghStrategy,
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