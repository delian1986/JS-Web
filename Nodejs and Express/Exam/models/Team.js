const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: [true, 'Team name must be unique!'] },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: [] }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }]
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team


