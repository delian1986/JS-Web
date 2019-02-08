const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{type:mongoose.Schema.Types.String,required:true,minlength:[1,'Title cannot be empty']},
    content:{type:mongoose.Schema.Types.String,required:true,minlength:[1,'Content cannot be empty']},
    lockedStatus:{type:mongoose.Schema.Types.Boolean,required:true,default:false},
    edits:[{type:mongoose.Schema.Types.ObjectId,ref:'Edit',default:[]}],
    date:{type:mongoose.Schema.Types.Date,default:Date.now}
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
