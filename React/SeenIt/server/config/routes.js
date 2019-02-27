const authRoutes = require('../routes/auth')
const postRoutes = require('../routes/post')
const statsRoutes = require('../routes/stats')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/posts', postRoutes)
  app.use('/stats', statsRoutes)
  app.use('/orders', ordersRoutes)
}
