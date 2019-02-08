const mongoose = require('mongoose');

const editSchema = new mongoose.Schema({
    article:{type:mongoose.Schema.Types.ObjectId,ref:'Article',required:[true,'Edit must have article']},
    editor:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:[true,'Edit must have author']},
    date:{type:mongoose.Schema.Types.Date,default:Date.now}
})

const Edit = mongoose.model('Edit', editSchema)

module.exports = Edit
