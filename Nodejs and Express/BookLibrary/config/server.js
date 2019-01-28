const handlebars=require('express-handlebars')
const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')

module.exports=(app)=>{
    app.engine('hbs',handlebars({
        extname:'.hbs',
        layoutsDir:'views/layouts',
        defaultLayout:'main'
    }))

    app.set('view engine','hbs')

    app.use(express.static(path.join(__dirname,'../public')))
    app.use(bodyParser.urlencoded({extended:true}))
}