const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController=require('../controllers/user')
const carController=require('../controllers/car')

module.exports = app => {
    app.get('/', homeController.index);

    app.get('/search',homeController.search)

    app.get('/user/register',restrictedPages.isAnonymous, userController.registerGet)
    app.post('/user/register',restrictedPages.isAnonymous,userController.registerPost)
    app.post('/user/logout',restrictedPages.isAuthed, userController.logout)

    app.get('/user/login',restrictedPages.isAnonymous,userController.loginGet)
    app.post('/user/login',restrictedPages.isAnonymous,userController.loginPost)

    app.get('/user/rents',restrictedPages.isAuthed,userController.rentsGet)

    app.get('/car/add',restrictedPages.hasRole('Admin'),carController.carAddGet)
    app.post('/car/add',restrictedPages.hasRole('Admin'),carController.carAddPost)

    app.get('/car/all',carController.carAllGet)

    app.get('/car/rent/:id',restrictedPages.isAuthed,carController.carRentGet)
    app.post('/car/rent/:id',restrictedPages.isAuthed,carController.carRentPost)
    
    app.get('/car/edit/:id',restrictedPages.hasRole('Admin'),carController.carEditGet)
    app.post('/car/edit/:id',restrictedPages.hasRole('Admin'),carController.carEditPost)


    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};