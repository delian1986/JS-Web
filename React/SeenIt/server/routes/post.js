const express = require('express')
const authCheck = require('../config/auth-check')
const Post = require('../models/Post')

const router = new express.Router()

function validatePostCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Post title must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 3|| payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 3 symbols and less than 120 symbols.'
  }


  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.imageUrl.startsWith('http://')) || payload.image.length < 3) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 3 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', authCheck, (req, res) => {
  const postObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validatePostCreateForm(postObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Post
      .create(postObj)
      .then((createdBook) => {
        res.status(200).json({
          success: true,
          message: 'Book added successfully.',
          data: createdBook
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
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const postId = req.params.id
    const postObj = req.body
    const validationResult = validatePostCreateForm(postObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Post
      .findById(postId)
      .then(existingPost => {
        existingPost.title = postObj.title
        existingPost.author = postObj.author
        existingPost.genres = postObj.genres
        existingPost.description = postObj.description
        existingPost.price = postObj.price
        existingPost.image = postObj.image

        existingPost
          .save()
          .then(editedPost => {
            res.status(200).json({
              success: true,
              message: 'Post edited successfully.',
              data: editedPost
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
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Post
    .find()
    .populate('author','username')
    .then(posts => {

      res.status(200).json(posts)
    })
})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Post
    .findById(id)
    .then(book => {
      if (!book) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = book.reviews
      reviews.push(reviewObj)
      book.reviews = reviews
      book
        .save()
        .then((book) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: book
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Post
    .findById(id)
    .then(book => {
      if (!book) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = book.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      book.likes = likes
      book
        .save()
        .then((book) => {
          res.status(200).json({
            success: true,
            message: 'Book liked successfully.',
            data: book
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Post
    .findById(id)
    .then(book => {
      if (!book) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = book.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      book.likes = likes
      book
        .save()
        .then((book) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: book
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Post
      .findById(id)
      .then((post) => {
        post
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'post deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/details/:id',(req,res)=>{
  const id=req.params.id
  console.log(id);
  Post.findById(id).populate('author','username')
    .then((post)=>{
      return res.status(200).json({
        post
      })
    })
    .catch(console.log())
})

module.exports = router
