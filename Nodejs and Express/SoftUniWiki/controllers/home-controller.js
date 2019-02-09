const Article=require('../models/Article')
const Edit = require('../models/Edit')
const User=require('../models/User')

module.exports = {
    index: async (req, res) => {
        try {
            let latest=await Article.findOne().sort({'date':-1})
            let lastEdit= await Edit.find({'article':latest._id})
                                        .sort({'date':-1})
                                        .limit(1)
                                        .populate('editor')

            if (latest && lastEdit){
                //this regex should find first 50 words... it don't work as intended
                latest.content=lastEdit[0].content.replace(/(([^\s]+\s\s*){50})/gm,"$1…")
                latest.author=lastEdit[0].editor.email
            }

            const latestThreeArticles=await Article.find().limit(3).sort({'date':-1})
            res.render('home/index',{latest,latestThreeArticles});
        } catch (e) {
            console.log(e)
            return
        }
    },
    search:async(req,res)=>{
        const needle=req.query.needle
        try {
          const reqArticles=await Article.find()
          let articles=reqArticles.filter(a=>a.title.toLowerCase().includes(needle))
        
        return res.render('article/all',{articles})
        } catch (e) {
            console.log(e)
            return
        }
    }
}