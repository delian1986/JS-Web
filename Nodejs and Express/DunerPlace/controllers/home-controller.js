const Product=require('../models/Product')

module.exports = {
    index: async(req, res) => {
        try {
            const products= await Product.find()

            products.chicken=products.filter(p=>p.category === 'Chicken')
            products.beef=products.filter(p=>p.category === 'Beef')
            products.lamb=products.filter(p=>p.category === 'Lamb')
            
            res.render('home/index',{products});
        } catch (e) {
            
        }
        
    }
};