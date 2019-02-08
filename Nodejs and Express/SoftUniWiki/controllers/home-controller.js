const Article=require('../models/Article')

module.exports = {
    index: async (req, res) => {
        try {
            let latest=await Article.findOne().sort({'date':-1})
            latest.content=latest.content.replace(/(([^\s]+\s\s*){50})(.*)/,"$1…")

            const latestThreeArticles=await Article.find().limit(3).sort({'date':-1})
            res.render('home/index',{latest,latestThreeArticles});
        } catch (e) {
            console.log(e)

        }
    }
}