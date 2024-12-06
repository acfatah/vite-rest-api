import process from 'node:process'
import express from 'express'
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET
const router = express.Router()

const refreshTokens = []

router.post('/login', (req, res) => {
  const { username, password } = req.body

  // TODO: Implement user authentication logic
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ username }, refreshTokenSecret, { expiresIn: '7d' })

    refreshTokens.push(refreshToken)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Ensure this is true in production
      sameSite: 'Strict',
    })
    res.json({ token })
  }
  else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
})

router.post('/register', (req, res) => {
  // TODO: Implement user registration logic
  res.json({ message: 'Not implemented yet' })
})

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: 'Refresh token not found or invalid' })
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }

    const newToken = jwt.sign({ username: user.username }, secret, { expiresIn: '1h' })
    res.json({ token: newToken })
  })
})

export default router
