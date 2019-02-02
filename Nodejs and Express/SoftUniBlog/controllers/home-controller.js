const Article=require('../models/Article')

module.exports = {
    index: async(req, res) => {
        try {
            const articles=await Article.find()
            res.render('home/index',{articles});
        
        } catch (e) {
            console.log(e)
        }
    }
};