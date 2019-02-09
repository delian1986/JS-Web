const Article=require('../models/Article')
const Edit = require('../models/Edit')

module.exports={
    historyGet:async (req,res)=>{
        const editId=req.params.id

        try {
            const edit= await Edit.findById(editId).populate('article')

            let article={}
            article.title=edit.article.title
            article.content=edit.content
            article._id=edit.article._id

            return res.render('article/details',article)
        } catch (error) {
            console.log(e)
            return
        }
    }
}