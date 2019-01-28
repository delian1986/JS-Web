const homeController=require('../controllers/home-controller')
const cubeController=require('../controllers/cube-controller')


module.exports = app => {
    app.get('/',homeController.homeGet)

    app.get('/create',cubeController.getAddCube)
    app.post('/create',cubeController.postAddCube)
};