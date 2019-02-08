const Thread = require('../models/Thread')
const User = require('../models/User')

module.exports = {
    index: async (req, res) => {
        let threads = null

        if (req.user && req.user.isInRole('Admin')) {
            try {
                threads = await Thread.find().populate('users')
            } catch (e) {
                console.log(e)
            }
        }

        res.render('home/index', {threads});
    }
}