var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    articleName : {type : String},
    imageFile : {type : String},
    description : {type : String},
    author : {type : String},
},{timestamps : true})

var Article = mongoose.model('Article', articleSchema)
module.exports = Article;