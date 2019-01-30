const homeController=require('../controllers/home-controller')
const cubeController=require('../controllers/cube-controller')
const aboutController=require('../controllers/about-controller')


module.exports = app => {
    app.get('/',homeController.homeGet)

    app.get('/about',aboutController.aboutGet)

    app.get('/create',cubeController.getAddCube)
    app.post('/create',cubeController.postAddCube)

    app.get('/details/:id',cubeController.getDetails)

    app.get('/search',homeController.search)
};