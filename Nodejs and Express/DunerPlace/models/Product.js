const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:{type:mongoose.Schema.Types.String,required:[true,"Category name is required"],enum: ['Chicken', 'Lamb', 'Beef']},
    size:{type:mongoose.Schema.Types.Number,required:true,min:[17,"Min size is 17cm"],max:[24,"Max size is 24cm"]},
    imageUrl:{type:mongoose.Schema.Types.String,required:[true,"ImageUrl is required"]},
    toppings:{type:[mongoose.Schema.Types.String],default:[]}
})

const Product=mongoose.model('Product',productSchema)

module.exports=Product