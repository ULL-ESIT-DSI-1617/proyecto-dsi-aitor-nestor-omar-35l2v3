let User = require("../models/user");


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



