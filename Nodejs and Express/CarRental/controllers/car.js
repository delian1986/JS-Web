const Car = require('../models/Car')
const Rent = require('../models/Rent')
const User=require('../models/User')

module.exports = {
    carAddGet: (req, res) => {
        res.render('car/add')
    },
    carAddPost: async (req, res) => {
        const reqCar = req.body

        try {
            await Car.create({
                model: reqCar.model,
                image: reqCar.image,
                pricePerDay: reqCar.pricePerDay,
            })
            req.session.msg = { success: 'Car created!' };
            res.redirect('/car/all')
            return

        } catch (e) {
            reqCar.error = e._message
            res.render('car/add', reqCar)
        }
    },
    carAllGet: async (req, res) => {
        try {
            const cars = await Car.find({ isRented: false })
            res.render('car/all', { cars })
            return
        } catch (e) {
            res.render('car/all')
        }
    },
    carRentGet: async (req, res) => {
        const id = req.params.id
        try {
            const car = await Car.findById(id)

            res.render('car/rent',car)
            return
        } catch (e) {
            console.log(err);
            req.session.msg = { error: '400 - Bad Request!' };
            res.redirect('/');
        }
    },
    carRentPost:async(req,res)=>{
        try {
            const userId=req.user.id
            const car = req.params.id
            const user=req.user._id
            const days=Number(req.body.days)
            let date=new Date()
            date.setDate(date.getDate()+days)

            const rent=await Rent.create({expiresOn:date,car,owner:user})

            const rentedCar = await Car.findById(car)
            rentedCar.isRented=true
            rentedCar.save()

            const reqUser=await User.findById(userId)
            reqUser.rents.push(rent._id)

            reqUser.save()
            
            res.redirect('/car/all')
            return 
            
        } catch (e) {
            console.log(e)

        }
    },
    carEditGet:async(req,res)=>{
        let carId=req.params.id

        try{
            let car=await Car.findById(carId)
            res.render('car/edit',car)
            return
        }catch(e){
            console.log(e)
        }
    },
    carEditPost:async(req,res)=>{
        const id=req.params.id
        const model=req.body.model
        const image=req.body.image
        const pricePerDay=req.body.pricePerDay

        try{
            const car=await Car.findById(id)
            car.model=model
            car.image=image
            car.pricePerDay=pricePerDay

            car.save()

            res.redirect('/car/all')
        }catch(e){
            console.log(e)
        }
    }
}