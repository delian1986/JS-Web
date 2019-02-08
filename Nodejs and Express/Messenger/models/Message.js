const mongoose=require('mongoose')

const messageSchema=new mongoose.Schema({
    content:{type:mongoose.Schema.Types.String,required:[true,'Message should have content!']},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:[true,'Message should have receiver!']}
})

const Message=mongoose.model('Message', messageSchema)

module.exports = Message