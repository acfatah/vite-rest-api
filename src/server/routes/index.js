import process from 'node:process'
import express from 'express'
import testRoutes from '../../../tests/routes.js'
import authRoutes from './auth.js'

const router = express.Router()

if (['development', 'test'].includes(process.env.NODE_ENV)) {
  router.use(testRoutes)
}

// Health Check Endpoint
router.get('/status', (req, res) => {
  const healthCheck = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }
  try {
    // Add any additional checks (e.g., database connection)
    res.status(200).json(healthCheck)
  }
  catch (error) {
    healthCheck.status = 'unhealthy'
    healthCheck.error = error.message
    res.status(503).json(healthCheck)
  }
})

router.get('/', (_req, res) => {
  res.send('Server is running')
})

router.use('/api/v1/auth', authRoutes)

export default router
