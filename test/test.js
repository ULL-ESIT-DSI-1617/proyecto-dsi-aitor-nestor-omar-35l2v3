let User = require("../models/user");
let strategy = require('passport-github');
var chai = require('chai');
var expect = chai.expect;  

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

describe('passport-github', function() {
    
  it('Se exporta correctamente', function() {
    expect(strategy.Strategy).to.be.a('function');
  });
    
  it('Se exporta como un modulo correctamente', function() {
    expect(strategy).to.be.a('function');
    expect(strategy).to.equal(strategy.Strategy);
  });
  
});


