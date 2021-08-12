var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name : {type : String},
    username : {type : String},
    email : {type : String, required : true , unique : true},
    photo : {type : String}
}, {timestamps : true})

var User = mongoose.model('User',userSchema)
module.exports = User;