let mongoose = require('mongoose');
let Schema = require('mongoose').Schema

let Evento = new Schema({
    title         :   String,
    hour          :   String,
    date          :   { type: Date, default: Date.now },
    description   :   String,

});


module.exports = mongoose.model('Evento', Evento);
