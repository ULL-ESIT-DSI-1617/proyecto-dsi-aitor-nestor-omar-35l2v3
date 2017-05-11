let User = require("../models/user");
let strategyGithub = require('passport-github');
let strategyTwitter = require('passport-twitter');
let chai = require('chai');
let expect = chai.expect;  

let prueba = User({
    nombre: 'Usuario',
    password: ""
});


prueba.save((err) => {
    if (err) console.log(err);
});

describe("Mongodb funciona correctamente", function () {
   it("Se inserta un usuario correctamente", function() {
   let test = User.find({ nombre: 'Usuario' })
   let result = test._conditions.nombre;
   result.should.equal('Usuario');
  })
});

describe('Passport', function() {
    
  it('Se exporta correctamente passport-github', function() {
    expect(strategyGithub.Strategy).to.be.a('function');
  });
  
  it('Se exporta correctamente passport-twtter', function() {
    expect(strategyTwitter.Strategy).to.be.a('function');
  });
  
  
});


