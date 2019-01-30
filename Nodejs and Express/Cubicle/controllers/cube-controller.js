const Cube = require('../models/Cube.js')


module.exports = {
    getAddCube: (req, res) => {
        res.render('create')
    },

    postAddCube: (req, res) => {
        let cube = req.body
        
        Cube.create(cube)
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                cube.error = err.message
                res.render('create', cube)
            })
    },

    getDetails:(req,res)=>{
        const id= req.params.id
        Cube.findById(id)
            .then((cube)=>{
                res.render('details',cube)
            }).catch((err)=>{
                console.log(err)
                res.status(404)
                return
            })
    }

}