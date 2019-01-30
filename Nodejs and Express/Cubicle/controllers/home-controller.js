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
    },
    search:(req,res)=>{
        let {name,from,to}=req.query
        from=Number(from)
        to=Number(to)
        
        Cube.find()
            .where('difficulty')
            .gte(from)
            .lte(to)
            .then((cubes)=>{
                filteredCubes=cubes.filter(c=>c.name.toLowerCase()===name.toLowerCase())
                res.render('index',{filteredCubes})
                
            }).catch((err)=>{
                console.log(err);
            })


    }
};