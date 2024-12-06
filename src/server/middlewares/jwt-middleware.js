import process from 'node:process'
import { expressjwt } from 'express-jwt'

const secret = process.env.JWT_SECRET

export const jwtMiddleware = expressjwt({
  secret,
  algorithms: ['HS256'],
}).unless({
  path: [
    // public routes that don't require authentication
    '/',
    '/status',
    '/refresh-token',
    '/api/v1/auth/login',
    '/api/v1/auth/register',
  ],
})

export function jwtErrorHandler(error, req, res, next) {
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}
