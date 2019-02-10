const User = require('mongoose').model('User');
const Team = require('../models/Team')
const Project = require('../models/Project')

module.exports = {
    createGet: (req, res) => {
        return res.render('project/create')
    },
    createPost: async (req, res) => {
        const { name, description } = req.body

        try {
            await Project.create({
                name: name,
                description: description
            })

            return res.redirect('/project/all-admin')
        } catch (e) {
            console.log(e)
            return
        }
    },
    allAdminGet: async (req, res) => {
        try {
            const teams = await Team.find()
            let allProjects = await Project.find()
            let projects = allProjects.filter(p => p.team === undefined)

            return res.render('project/all', { teams, projects })

        } catch (e) {
            console.log(e)
            return
        }
    },
    allAdminPost: async (req, res) => {
        const teamId = req.body.team
        const projectId = req.body.project
        try {
            let team = await Team.findById(teamId)
            let project = await Project.findById(projectId)

            team.projects.push(project._id)
            team.save()

            project.team = team._id
            project.save()

            return res.redirect('/project/all-admin')
        } catch (e) {
            console.log(e)
            return
        }
    },
    allUserGet: async (req, res) => {
        try {
            const projects = await Project.find()
                .populate('team')

            return res.render('project/all', { projects })
        } catch (e) {
            console.log(e)
            return
        }
    },
    search: async (req, res) => {
        let needle = req.query.needle

        try {
            const allProjects = await Project.find().populate('team')

            const projects = allProjects.filter(p => p.name.toLowerCase().includes(needle))

            return res.render('project/all', { projects })
        } catch (e) {
            console.log(e)
            return
        }
    }
}