const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let postSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'Book already exists.']},
  url: {type: mongoose.Schema.Types.String},
  author: {type: mongoose.Schema.Types.ObjectId, ref:'User',required: REQUIRED_VALIDATION_MESSAGE},
  description: {type: mongoose.Schema.Types.String},
  imageUrl: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  comments:[{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
})

let Book = mongoose.model('Post', postSchema)

module.exports = Book