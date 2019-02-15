const restrictedPages = require('./auth');
const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')
const teamController=require('../controllers/team-controller')
const projectController=require('../controllers/project-controller')

module.exports = app => {
    app.get('/',restrictedPages.isAnonymous,homeController.index)

    //user routes
    app.get('/user/login',restrictedPages.isAnonymous,userController.loginGet)
    app.post('/user/login',restrictedPages.isAnonymous,userController.loginPost)
    
    app.get('/user/register',restrictedPages.isAnonymous,userController.registerGet)
    app.post('/user/register',restrictedPages.isAnonymous,userController.registerPost)
    
    app.post('/user/logout',restrictedPages.isAuthed,userController.logout)
    app.get('/user/profile',restrictedPages.isAuthed,userController.profile)

    app.post('/user/leave/:id',restrictedPages.isAuthed,userController.leaveTeam)

    //team routes
    app.get('/team/create',restrictedPages.hasRole('Admin'),teamController.createGet)
    app.post('/team/create',restrictedPages.hasRole('Admin'),teamController.createPost)
    
    app.get('/team/all-admin',restrictedPages.hasRole('Admin'),teamController.allAdminGet)
    app.post('/team/all-admin',restrictedPages.hasRole('Admin'),teamController.allAdminPost)

    app.get('/team/all',restrictedPages.isAuthed,teamController.allUserGet)

    app.get('/search/team',restrictedPages.isAuthed,teamController.search)

    //project routes
    app.get('/project/create',restrictedPages.hasRole('Admin'),projectController.createGet)
    app.post('/project/create',restrictedPages.hasRole('Admin'),projectController.createPost)
    
    app.get('/project/all-admin',restrictedPages.hasRole('Admin'),projectController.allAdminGet)
    app.post('/project/all-admin',restrictedPages.hasRole('Admin'),projectController.allAdminPost)

    app.get('/project/all',restrictedPages.isAuthed,projectController.allUserGet)

    app.get('/search/project',restrictedPages.isAuthed,projectController.search)

    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};