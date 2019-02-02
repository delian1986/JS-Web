const restrictedPages = require('./auth');
const homeController=require('../controllers/home-controller')
const userController=require('../controllers/user-controller')

module.exports = app => {
    app.get('/', homeController.index);
    app.get('/user/register',restrictedPages.isAnonymous, userController.registerGet);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};