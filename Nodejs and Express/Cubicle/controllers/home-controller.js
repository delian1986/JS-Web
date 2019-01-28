const Cube = require('../models/Cube')

module.exports = {
    homeGet: (req, res) => {
        Cube.find({})
            .then(cubes => {
                res.render('index',{cubes})
            })
            .catch((err=>{
                console.log(err)
                return
            }))
    }
};