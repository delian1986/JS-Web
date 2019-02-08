const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: [] }],
    date: { type: mongoose.Schema.Types.Date, default: Date.now }
})

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
