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
            return
        }
    },
    allGet: async (req, res) => {
        try {
            const articles = await Article.find().sort('date')
            return res.render('article/all', { articles })
        } catch (e) {
            console.log(e)
            return
        }
    },
    detailsGet: async (req, res) => {
        const articleId = req.params.id

        try {
            const article = await Article.findById(articleId)
            let lastEdit = await Edit.find({ 'article': articleId }).sort({ 'date': -1 }).limit(1)

            article.content = lastEdit[0].content

            res.render('article/details', article)
        } catch (e) {
            console.log(e)
            return
        }
    },
    editGet: async (req, res) => {
        const articleId = req.params.id
        try {
            let reqArticle = await Article.findById(articleId)

            if (reqArticle.lockedStatus && req.user.isInRole('User')) {
                res.locals.globalError = 'This article is locked and only Admin can edit it!'
                return res.redirect(`/article/details/${reqArticle._id}`)
            }

            let lastEdit = await Edit.find({ 'article': articleId }).sort({ 'date': -1 }).limit(1)
            let article = {}

            if (reqArticle && lastEdit) {
                article.title = reqArticle.title
                article.content = lastEdit[0].content
                article._id = reqArticle._id
                article.lockedStatus = reqArticle.lockedStatus
            }

            res.render('article/edit', article)
        } catch (e) {
            console.log(e)
            return
        }
    },
    editPost: async (req, res) => {
        const articleId = req.params.id
        const content = req.body.content
        const currUser = req.user
        try {
            let reqArticle = await Article.findById(articleId)

            let currEdit = await Edit.create({
                article: articleId,
                content: content,
                editor: currUser._id
            })

            reqArticle.edits.push(currEdit._id)
            reqArticle.save()

            currUser.edits.push(currEdit._id)
            currUser.save()

            return res.redirect('/')

        } catch (e) {
            console.log(e)
            return
        }
    },
    historyGet: async (req, res) => {
        const articleId = req.params.id

        try {
            const article = await Article
                .findById(articleId)
                .populate(
                    {
                        path: 'edits',
                        populate:
                        {
                            path: 'editor'
                        }
                    })

            return res.render('article/history', article)
        } catch (e) {
            console.log(e)
            return
        }
    },
    lock: async (req, res) => {
        const articleId = req.params.id

        try {
            let reqArticle = await Article.findById(articleId)

            if (!reqArticle.lockedStatus) {
                reqArticle.lockedStatus = true
                reqArticle.save()
            }

            return res.redirect(`/article/edit/${reqArticle._id}`)

        } catch (e) {
            console.log(e)
            return
        }
    },
    unlock: async (req, res) => {
        const articleId = req.params.id

        try {
            let reqArticle = await Article.findById(articleId)

            if (reqArticle.lockedStatus) {
                reqArticle.lockedStatus = false
                reqArticle.save()
            }

            return res.redirect(`/article/edit/${reqArticle._id}`)

        } catch (e) {
            console.log(e)
            return
        }
    },
    latest: async(req, res) => {
        try {
            let latest = await Article.findOne().sort({ 'date': -1 })
            let lastEdit = await Edit.find({ 'article': latest._id })
                .sort({ 'date': -1 })
                .limit(1)
                .populate('editor')

            if (latest && lastEdit) {
                //this regex should find first 50 words... it don't work as intended
                latest.content = lastEdit[0].content
                latest.author = lastEdit[0].editor.email
            }

            return res.render('article/details',latest)
        } catch (e) {
            console.log(e)
            return
        }
    }
}