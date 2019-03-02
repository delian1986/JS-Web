const express = require('express')
// const authCheck = require('../config/auth-check')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const router = new express.Router()

router.post('/create/', (req, res) => {
  const commentObj = req.params
  const postId = req.params.postId

  Comment
    .create(commentObj)
    .then((comment) => {
      Post.findById(postId)
        .then(post=>{
          post.comments.push(comment._id)
          post.save()
          res.status(200).json({
            success: true,
            message: 'Comment added successfully.'
          })
        })
    })
    .catch((err) => {
      console.log(err)
      let message = 'Something went wrong :( Check the form for errors.'
      if (err.code === 11000) {
        message = 'Book with the given name already exists.'
      }
      return res.status(200).json({
        success: false,
        message: message
      })
    })

})




  module.exports = router
