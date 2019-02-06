const Order = require('../models/Order')
const Product = require('../models/Product')
const User = require('../models/User')

module.exports = {
    placeGet: async (req, res) => {
        const productId = req.params.id
        try {
            const product = await Product.findById(productId)
            res.render('order/place', product)
        } catch (e) {
            console.log(e)
        }
    },
    placePost: async (req, res) => {
        const creator = req.user
        const productId = req.params.id
        const orderDetails = req.body
        let toppings = orderDetails.toppings

        if (!orderDetails.toppings) {
            toppings = []
        }

        try {
            const newOrder = await Order.create({
                creator: creator._id,
                product: productId,
                toppings: toppings
            })
            creator.orders.push(newOrder._id)
            creator.save()

            res.redirect(`/order/details/${newOrder._id}`)

        } catch (e) {
            console.log(e)
        }

    },
    statusGet: async (req, res) => {

        try {
            const userId = req.user._id
            const user = await User.findById(userId)
                .populate({ path: 'orders', populate: { path: 'product' } })

            orders = user.orders
            return res.render('order/status', { orders })

        } catch (e) {
            console.log(e)
        }
    },
    detailsGet: async (req, res) => {
        const orderId = req.params.id

        try {
            const order = await Order.findById(orderId)
                .populate('product')

            switch (order.status) {
                case "Pending":
                    order.pending = true
                    break
                case "In progress":
                    order.inProgress = true
                    break
                case "In transit":
                    order.inTransit = true
                    break
                case "Delivered":
                    order.delivered = true
                    break
            }

            return res.render('order/details', order)

        } catch (e) {
            console.log(e)
        }
    },
    allGet: async (req, res) => {
        try {
            const orders = await Order.find().populate('product')
            return res.render('order/all', { orders })

        } catch (e) {
            console.log(e)
        }
    },
    allPost: async (req, res) => {
        const orders = req.body
        try {
            for (const id in orders) {
                const newStatus=orders[id]
                await Order.updateOne({_id:id},{status:newStatus})
            }
            res.redirect('/orders/all')
        } catch (e) {
            console.log(e)
        }
    }

}