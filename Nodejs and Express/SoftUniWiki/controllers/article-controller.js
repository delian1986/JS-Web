const Article=require('../models/Article')
const Edit=require('../models/Edit')
const User=require('../models/User')

module.exports = {
    createGet:(req,res)=>{
        return res.render('article/create')
    },
    createPost:async (req,res)=>{
        
    }
}