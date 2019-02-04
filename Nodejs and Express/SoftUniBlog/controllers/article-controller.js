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
    detailsGet: async (req, res) => {
        try {
            const articleId = req.params.id
            const reqArticle = await Article.findById(articleId).populate('author')

            if (req.user) {
                const isAuthor = req.user.isAuthor(reqArticle)
                const isAdmin = req.user.isInRole('Admin')
                reqArticle.isAuthor = isAuthor
                reqArticle.isAdmin = isAdmin
            }
            res.render('article/details', reqArticle)

        } catch (e) {
            console.log(e)
        }
    },
    editGet: async (req, res) => {
        try {
            articleId = req.params.id
            const reqArticle = await Article.findById(articleId)

            res.render('article/edit', reqArticle)
        } catch (e) {
            console.log(e)
            return
        }
    },
    editPost: async (req, res) => {
        const articleId = req.params.id
        const { title, content } = req.body

        try {
            const reqArticle = await Article.findById(articleId)
            reqArticle.title = title
            reqArticle.content = content

            reqArticle.save()

            res.redirect(`/article/details/${articleId}`)
        } catch (e) {
            console.log(e)
        }
    },
    deleteGet: async (req, res) => {
        try {
            articleId = req.params.id
            const reqArticle = await Article.findById(articleId)

            res.render('article/delete', reqArticle)
        } catch (e) {
            console.log(e)
            return
        }
    },
    deletePost: async (req, res) => {
        articleId = req.params.id

        try{
            const reqArticle=await Article.findById(articleId)
            const authorId=reqArticle.author._id
            const articleAuthor= await User.findById(authorId)

            const articleIndex=articleAuthor.articles.indexOf(articleId)
            if(articleAuthor.articles.indexOf(articleId)>-1){
                articleAuthor.articles.splice(articleIndex,1)

                articleAuthor.save()
            }
            reqArticle.delete()
    
            res.redirect('/')
        }catch(e){
            console.log(e)
        }
        



    }

}