const authRoutes = require('../routes/auth')
const postRoutes = require('../routes/post')
const statsRoutes = require('../routes/stats')
const commentRoutes = require('../routes/comment')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/posts', postRoutes)
  app.use('/stats', statsRoutes)
  app.use('/comment', commentRoutes)
}
