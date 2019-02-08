const Article = require('../models/Article')
const Edit = require('../models/Edit')
const User = require('../models/User')

module.exports = {
    createGet: (req, res) => {
        return res.render('article/create')
    },
    createPost: async (req, res) => {
        const { title, content } = req.body
        const currUser = req.user

        try {
            const article = await Article.create({
                title: title,
                content: content
            })

            const edit = await Edit.create({
                article: article._id,
                content: content,
                editor: currUser._id
            })

            article.edits.push(edit._id)
            article.save()

            currUser.edits.push(edit._id)
            currUser.save()

            res.redirect('/article/all')

        } catch (e) {
            console.log(e)
        }
    },
    allGet:async (req,res)=>{
        try {
            const articles=await Article.find().sort('date')

        } catch (e) {
            console.log(e)
        }
    },
    detailsGet:async(req,res)=>{
        const articleId=req.params.id

        try {
            
        } catch (e) {
        
        }
    }
}