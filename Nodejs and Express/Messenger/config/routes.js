const restrictedPages = require('./auth');
const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')
const threadController=require('../controllers/thread-controller')

module.exports = app => {
    app.get('/', homeController.index);

    app.get('/users/register',restrictedPages.isAnonymous,userController.registerGet)
    app.post('/users/register',restrictedPages.isAnonymous,userController.registerPost)
    app.get('/users/login',restrictedPages.isAnonymous,userController.loginGet)
    app.post('/users/login',restrictedPages.isAnonymous,userController.loginPost)
    app.get('/users/logout',restrictedPages.isAuthed,userController.logout)

    app.post('/threads/find',restrictedPages.isAuthed,threadController.findPost)
    app.get('/thread/:userId',restrictedPages.isAuthed,threadController.chatGet)
    app.post('/thread/:userId',restrictedPages.isAuthed,threadController.chatPost)

    app.post('/block/:userId',restrictedPages.isAuthed,userController.blockUser)
    app.post('/unblock/:userId',restrictedPages.isAuthed,userController.unblockUser)

    app.post('/threads/remove/:threadId',restrictedPages.hasRole('Admin'),threadController.threadDelete)
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};