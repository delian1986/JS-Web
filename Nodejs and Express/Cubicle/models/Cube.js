const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    },
    difficulty: 
    { 
        type: Number, 
        required: true
    }
})

cubeSchema.path('name')
    .validate(function () {
        return this.name.length >= 3 && this.name.length <= 15
    }, 'Name must be between 3 and 15 symbols')

cubeSchema.path('description')
    .validate(function () {
        return this.description.length >= 20 && this.description.length <= 300
    }, 'Description must be between 20 and 300 symbols')

cubeSchema.path('image')
    .validate(function () {
        return this.image.startsWith('https://')
            && (this.image.endsWith('.jpg') || this.image.endsWith('.png'))
    },'Invalid picture')

cubeSchema.path('difficulty')
    .validate(function () {
        return this.difficulty >= 1 && this.difficulty <= 6
    },'Invalid Difficulty')

mongoose.model('Cube', cubeSchema)

module.exports = mongoose.model('Cube')