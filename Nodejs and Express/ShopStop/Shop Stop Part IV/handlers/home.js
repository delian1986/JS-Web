const Product = require('../models/Product')

module.exports.index = (req, res) => {
    let queryData = req.query

    Product.find().then((products) => {
        if (queryData.query) {
            products = products.filter(product => product.name.toLowerCase()
                .includes(queryData.query))
        }
        let content = ''


        for (let product of products) {
            content +=
                `<div class="product-cart">
                    <img class="product-img" src="${product.image}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                </div>`
        }
        res.render('home/index', { products: products })
    })
}