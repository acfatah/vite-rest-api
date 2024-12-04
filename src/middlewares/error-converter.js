import httpStatus from 'http-status'
import { logger } from '../services'
import { ApiError } from '../utils'

export function errorConverter(err, req, res, next) {
  let error = err

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
    const message = error.message || httpStatus[statusCode]

    logger.error(err)
    error = new ApiError(statusCode, message, false, err.stack)
  }

  next(error)
}
