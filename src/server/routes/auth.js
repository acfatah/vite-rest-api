import process from 'node:process'
import express from 'express'
import {
  authenticateUser,
  generateAccessToken,
  verifyRefreshToken,
} from '../services/auth-service.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  const authResult = authenticateUser(username, password)

  if (authResult) {
    const { token, refreshToken } = authResult

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    res.json({ token })
  }
  else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken

  try {
    const user = verifyRefreshToken(refreshToken)
    const newToken = generateAccessToken(user.username)

    res.json({ token: newToken })
  }
  catch (error) {
    res.status(403).json({ message: error.message })
  }
})

export default router
