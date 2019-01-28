const Book = require('../model/Book')

module.exports = {
    getAddBook: (req, res) => {
        res.render('books/add')
    },
    postAddBook: (req, res) => {
        let book = req.body

        if (!book.title || !book.imageUrl) {
            book.error = 'Title and url are required!'
            res.render('books/add', book)
        }

        book.releaseDate = new Date(book.releaseDate)

        Book.create(book)
            .then(() => {
                res.redirect('/all')
            })
    },
    getAllBooks: (req, res) => {
        Book
            .find({})
            .sort('-releaseDate')
            .then(books => {
                res.render('books/all', { books })
            })
            .catch((err) => {
                console.log(err)
                return
            })
    },
    getBookDetails: (req, res) => {
        const id=req.params.id

        Book.findById(id)
            .then(book=>{
                res.render('books/details',book)
            })
            .catch((err)=>{
                console.log(err)
                return
            })
    }
}