const User = require('mongoose').model('User');
const Product=require('../models/Product')

module.exports={
    addGet:(req,res)=>{
        res.render('product/add')
        return
    },
    addPost:async (req,res)=>{
        const reqProduct=req.body
        const reqToppings=reqProduct.toppings.split(/\r?\n/g)

        try {
            await Product.create({
                category:reqProduct.category,
                size:+reqProduct.size,
                imageUrl:reqProduct.imageUrl,
                toppings:reqToppings
            })

            res.redirect('/')
        } catch (e) {
            console.log(e.message)
            res.locals.globalError = e.message;
            res.render('product/add')
        }

    }
}