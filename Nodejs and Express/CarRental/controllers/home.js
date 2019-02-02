const Car=require('../models/Car')

module.exports = {
    index: (req, res) => {
        res.render('home/index');
    },
    search:async (req,res)=>{
        const needle=req.query.model
        try{
            const cars=await Car.find({model:needle,isRented:false})
            cars.filter(c=>c.model.toLowerCase().includes(needle.toLowerCase()))

            res.render('car/all',{cars})
        }catch(e){
            console.log(e)
        }
    }
};