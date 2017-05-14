let mongoose = require('mongoose');
let Schema = require('mongoose').Schema

let Evento = new Schema({
    user          :   {type: String, required: true},
    title         :   String,
    day           :   Number,
    month         :   Number,
    year          :   Number,
    description   :   String,

});


module.exports = mongoose.model('Evento', Evento);
