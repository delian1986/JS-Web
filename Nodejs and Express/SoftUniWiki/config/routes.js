const restrictedPages = require('./auth');
const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')
const articleController=require('../controllers/article-controller')

module.exports = app => {
    app.get('/', homeController.index);

    //user routes
    app.get('/user/login',restrictedPages.isAnonymous,userController.loginGet)
    app.post('/user/login',restrictedPages.isAnonymous,userController.loginPost)
    app.get('/user/register',restrictedPages.isAnonymous,userController.registerGet)
    app.post('/user/register',restrictedPages.isAnonymous,userController.registerPost)
    app.get('/user/logout',restrictedPages.isAuthed,userController.logout)

    //article routes
    app.get('/article/create',restrictedPages.isAuthed,articleController.createGet)
    app.post('/article/create',restrictedPages.isAuthed,articleController.createPost)

    app.get('/article/details/:id',articleController.detailsGet)
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};