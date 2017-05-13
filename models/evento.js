let mongoose = require('mongoose');
let Schema = require('mongoose').Schema

let Evento = new Schema({
    user          :   {type: String, required: true},
    title         :   String,
    hour          :   String,
    date          :   String,
    description   :   String,

});


module.exports = mongoose.model('Evento', Evento);
