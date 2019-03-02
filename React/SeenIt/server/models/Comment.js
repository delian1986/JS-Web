const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let commentSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId,ref:'User', required: REQUIRED_VALIDATION_MESSAGE},
  content:{type:String},
  post:{type: mongoose.Schema.Types.ObjectId, ref:'Post'}
})

let Order = mongoose.model('Comment', commentSchema)

module.exports = Order
