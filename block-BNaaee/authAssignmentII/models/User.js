var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : {type : String},
    username : {type : String},
    email : {type : String, required : true , unique : true},
    photo : {type : String}

},{timestamps : true})

var User = mongoose.model('User', UserSchema)
module.exports = User;