/**
 * Created by chinegua on 8/5/17.
 */
let mongoose = require('mongoose');
let Schema = require('mongoose').Schema;

let User = new Schema({
    name            :   String,
    password        :   String

});


module.exports = mongoose.model('User', User);