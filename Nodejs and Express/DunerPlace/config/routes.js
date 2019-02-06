const restrictedPages = require('./auth');
const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')
const productController=require('../controllers/product-controller')
const orderController=require('../controllers/order-controller')

module.exports = app => {
    app.get('/', homeController.index);
    //usr routes
    app.get('/user/register',restrictedPages.isAnonymous, userController.registerGet);
    app.post('/user/register',restrictedPages.isAnonymous, userController.registerPost);
    app.get('/user/logout',restrictedPages.isAuthed,userController.logout);
    app.get('/user/login', restrictedPages.isAnonymous, userController.loginGet);
    app.post('/user/login',restrictedPages.isAnonymous, userController.loginPost);

    //product routes
    app.get('/product/add',restrictedPages.hasRole('Admin'),productController.addGet)
    app.post('/product/add',restrictedPages.hasRole('Admin'),productController.addPost)

    //order routes
    app.get('/order/place/:id',restrictedPages.isAuthed,orderController.placeGet)
    app.post('/order/place/:id',restrictedPages.isAuthed,orderController.placePost)
    app.get('/order/status',restrictedPages.isAuthed,orderController.statusGet)

    app.get('/order/details/:id',restrictedPages.isAuthed,orderController.detailsGet)

    app.get('/orders/all',restrictedPages.hasRole('Admin'),orderController.allGet)
    app.post('/orders/all',restrictedPages.hasRole('Admin'),orderController.allPost)

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};