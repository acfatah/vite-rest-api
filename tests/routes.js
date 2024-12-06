import express from 'express'

export const routes = express.Router()

routes.get('/protected', (req, res) => {
  res.json({ message: 'Protected route' })
})

export default routes
