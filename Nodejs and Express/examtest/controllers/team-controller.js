const User = require('../models/User')
const Team = require('../models/Team')
const Project = require('../models/Project')

module.exports = {
    createGet: (req, res) => {
        return res.render('team/create')
    },
    createPost: async (req, res) => {
        let teamName = req.body.name

        try {
            await Team.create({
                name: teamName
            })

            return res.redirect('/team/all-admin')
        } catch (e) {
            console.log(e)
            return
        }
    },
    allAdminGet: async (req, res) => {
        try {
            let users = await User.find()
            let teams = await Team.find()

            return res.render('team/all', { users, teams })
        } catch (e) {
            console.log(e)
        }
    },
    allAdminPost: async (req, res) => {
        const reqUserId = req.body.user
        const reqTeamId = req.body.team

        try {
            let user = await User.findById(reqUserId)
            let team = await Team.findById(reqTeamId)

            if (user.teams.indexOf(reqTeamId) > -1) {
                res.locals.globalError = `${user.username} is already in ${team.name}`
                return res.redirect('/team/all-admin')
            }

            user.teams.push(team._id)
            user.save()

            team.members.push(user._id)
            team.save()

            res.locals.globalError = `${user.username} was added in ${team.name}`
            return res.redirect('/team/all-admin')

        } catch (e) {
            console.log(e)
            return
        }
    },
    allUserGet: async (req, res) => {
        try {
            const teams = await Team.find()
                .populate('projects members')
                
            return res.render('team/all', { teams })
        } catch (e) {
            console.log(e)
            return
        }
    },
    search: async (req, res) => {
        let needle = req.query.needle

        try {
            const allTeams = await Team.find()
                .populate({
                    path: 'projects',
                    populate:
                    [{
                        path: 'members',
                        model: 'User'
                    }]
                })
            
                const teams=allTeams.filter(t=>t.name.toLowerCase().includes(needle))
            
            return res.render('team/all', { teams })
        } catch (e) {
            console.log(e)
            return
        }

    }

}