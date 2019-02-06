const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:[true,"Order must have creator"]},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:[true,"Order must have product"]},
    toppings:[{type:mongoose.Schema.Types.String,default:[]}],
    status:{type:mongoose.Schema.Types.String,enum:['Pending','In Progress','In Transit','Delivered'],default:'Pending'},
    date:{type:mongoose.Schema.Types.Date,default:Date.now}
})


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

