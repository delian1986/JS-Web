homeController=require('../controllers/home-controller')
bookController=require('../controllers/books-controller')

module.exports = (app) => {
    app.get('/', homeController.getIndex) 
    
    app.get('/add',bookController.getAddBook)
    app.post('/add',bookController.postAddBook)

    app.get('/all',bookController.getAllBooks)

    app.get('/details/:id',bookController.getBookDetails)
}


