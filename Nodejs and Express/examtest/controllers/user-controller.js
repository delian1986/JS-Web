const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Team = require('../models/Team')
const Project = require('../models/Project')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);

        if (reqUser.password !== '' && reqUser.password !== reqUser.repeatPassword) {
            res.locals.globalError = 'Passwords must match';
            return res.render('user/register');
        }

        if (reqUser.profilePicture === '') {
            reqUser.profilePicture = 'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png'
        }

        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                profilePicture: reqUser.profilePicture,
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('user/register', user);
                } else {
                    res.redirect('/user/profile');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/user/profile');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('user/login');
        }
    },
    profile: async (req, res) => {
        try {
            let reqUser = req.user
            let user = await User.findById(reqUser._id)
                .populate({
                    path: 'teams',
                    populate: [{
                        path: 'projects',
                        model:'Project'
                    }]
                })
                
                let teams = user.teams
                let projects = user.teams.projects
                console.log(user.teams);
                console.log(projects);

            return res.render('user/profile', { user, teams, projects })
        } catch (e) {
            console.log(e)
            return
        }
    },
    leaveTeam: async (req, res) => {
        let teamId = req.params.id
        let user = req.user
        try {
            if (user.teams.indexOf(teamId) > -1) {
                let teamPos=user.teams.indexOf(teamId)
                user.teams.splice(teamPos,1)
                user.save()

            }

            let team=await Team.findById(teamId)
            if(team.members.indexOf(user._id) > -1){
                let memberPos=team.members.indexOf(user._id)

                
                team.members.splice(memberPos,1)
                team.save()
            }

            return res.redirect('/user/profile')
        } catch (e) {
            console.log(e)
            return
        }
    }
}