const mongoose = require('mongoose');

const rentSchema=new mongoose.Schema({
    expiresOn:{type:mongoose.Schema.Types.Date,required:true},
    car:{type:mongoose.Schema.Types.ObjectId,ref:'Car',required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})

const Rent = mongoose.model('Rent', rentSchema);

module.exports=Rent