const User = require('../models/user.js');
const Event = require('../models/evento.js');
let bcrypt = require("bcrypt-nodejs");

module.exports = function(app,passport) {
  
    let auth = function(req, res, next) {
        let aux = 0;
        User.findOne({
            'name': req.session.user
        }, function(err, obj) {
            if ((obj == null) && (req.user == null)) { 
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
    
    
    function cleaner(str) {
        let tam = str.length;
        return str.substr(1,tam);
    }
    function adder(str) {
        try {
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
    
  
    
    app.get('/login/twitter',
      passport.authenticate('twitter'));

    app.get('/login/twitter/return', 
        passport.authenticate('twitter', { failureRedirect: '/login' }),
        function(req, res) {
              req.session.user = req.user.name;
              res.redirect('/calendar')
    });


    app.get('/login/github',
      passport.authenticate('github'));
      
    app.get('/login/github/return', 
          passport.authenticate('github', { failureRedirect: '/login' }),
          function(req, res) {
          req.session.user = req.user.name;
        res.redirect('/calendar')
    });


    app.post('/login', function(req, res) {
        console.log(req.body.name);
        User.findOne({
            'name': req.body.name
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
            "name": req.body.name,
            "password": pass
        });
        console.log("User a insertar");
        user.save(function(err) {
            if (err) return handleError(err);
            console.log("Success!!");
            req.session.user = user.name;
            console.log(req.body.name);
            res.redirect('/calendar')
        })
    });
    app.get('/session', function(req, res) {

        console.log(req.session.user);


    });

    app.get('/calendar',auth, function(req, res) {
        console.log(adder(req.session.user));
        //res.send("Entra");

            Event.find({
                "user" : adder(req.session.user)
            }).sort({year: 1, month: 1, day: 1}).exec(function (err, obj) {
                console.log(obj);
                res.render('timeline.ejs', {events: obj});
            })

    });

    app.post('/calendar',function (req,res) {
        console.log(req.body);
        Event.find({
            "day"    : {$gt: req.body.day_desde},
            "month"  : {$gt: req.body.month_desde-1},
            "year"   : {$gt: req.body.year_desde-1},
             "user": adder(req.session.user)
        }).sort({year: 1, month: 1, day: 1}).exec(function (err, obj) {
            console.log(obj);
            res.render('timeline.ejs', {events: obj});
        })

    })

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

    app.post('/calendar/create',function (req,res) {
        console.log("Se inserta");
        console.log(res.body);
        let evento = new Event({

            "user" : adder(req.session.user),
            "title": req.body.title,
            "day"  : req.body.day,
            "month": req.body.month,
            "year" : req.body.year,
            "description" : req.body.description,
        });

        //console.log(evento);
         evento.save(function(err) {
             console.log("Evento creado");
             res.redirect("/calendar");
         });

    });

    app.get('/calendar/edit/:id',auth, function(req, res) {
        console.log(req.params.id);


        Event.findOne({
                "_id"      : req.params.id,
            },function (err, event) {
            res.renderPjax('edit', { user: event.user, title: event.title,day: event.day,month: event.month,year: event.year,description:event.description });
                //res.render('edit.ejs',{ user: event.user, title: event.title,day: event.day,month: event.month,year: event.year,description:event.description });

        });

    });
    app.post('/calendar/edit/:id',auth, function(req, res) {
        console.log("Info a editar");
        console.log(req.body);
        Event.findOneAndUpdate({_id: req.params.id},{$set:{title: req.body.title,day: req.body.day ,month: req.body.month,year: req.body.year,description:req.body.description }},{new: true},function(err,dox){
            res.redirect('/calendar');
        })
    });


    app.get('/calendar/delete/:id', function(req, res) {
      Event.remove({'_id' : req.params.id}, function (err, id) {
        console.log("Eliminando evento");
        console.log(req.params.id);
        res.render('delete.ejs');
      });

    });

    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect("/login");

    });
    
}
