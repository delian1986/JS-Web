const Article = require('../models/Article')
const User = require('../models/User')

module.exports = {
    createGet: (req, res) => {
        res.render('article/create')
        return
    },
    createPost: async (req, res) => {
        const reqArticle = req.body
        const author = req.user

        try {
            const newArticle = await Article.create({
                title: reqArticle.title,
                content: reqArticle.content,
                author: req.user._id
            })

            author.articles.push(newArticle._id)
            author.save()

            res.redirect('/')
        } catch (e) {
            console.log(e)
            return
        }
    },
    detailsGet:async (req,res)=>{
        try{
            const articleId=req.params.id
            const reqArticle=await Article.findById(articleId).populate('author')
            
            if(req.user){
                const isAuthor=req.user.isAuthor(reqArticle)
                const isAdmin=req.user.isInRole('Admin')
                reqArticle.isAuthor=isAuthor
                reqArticle.isAdmin=isAdmin
            }
            res.render('article/details',reqArticle)

        }catch(e){
            console.log(e)
        }
    }

}