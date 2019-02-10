const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{type:mongoose.Schema.Types.String,required:[true,'Project should have name!']},
    description:{type:mongoose.Schema.Types.String,maxlength:[50,'Description should be max 50 chars long!']},
    team:{type:mongoose.Schema.Types.ObjectId,ref:'Team'}
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project
