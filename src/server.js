import process from 'node:process'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import minimist from 'minimist'

import { errorConverter, errorHandler, logger } from './middlewares'
import routes from './routes'
import { ApiError } from './utils'

const args = minimist(process.argv.slice(2))
const PORT = args.port || 3000

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

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.on('vite:beforeFullReload', () => {
    console.info('Restarting server...')
    server.close()
  })
}
