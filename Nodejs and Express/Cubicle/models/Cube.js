const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    name:
    {
        type: String,
        min: [3, 'Name must be at least 3 characters'],
        max: [15, 'Name must be at least 3 characters'],
        required: true
    },
    description:
    {
        type: String,
        min: [20, 'Description must be at least 20 characters'],
        max: [300, 'Description max be at least 300 characters']
    },
    imageUrl:
    {
        type: String,
        required: true
    },
    difficulty: { type: Number, min: 1, max: 6 }
})

mongoose.model('Cube', cubeSchema)

module.exports = mongoose.model('Cube')