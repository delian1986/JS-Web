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
                cube.error = err._message
                res.render('create', cube)
            })
    }

}