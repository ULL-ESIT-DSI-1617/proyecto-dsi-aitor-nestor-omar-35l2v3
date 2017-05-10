let mongoose = require('mongoose');
let Schema = require('mongoose').Schema

let Evento = new Schema({
    id            :   Integer,
    title         :   String,
    text          :   String,
    date          :   { type: Date, default: Date.now }

});


module.exports = mongoose.model('Evento', Evento);
