import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'

import { errorConverter, errorHandler, logger } from './middlewares/index.js'
import routes from './routes/index.js'
import { ApiError } from './utils/index.js'

export const app = express()

app.use(logger)

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// TODO: Add JWT authentication

app.use(routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)
