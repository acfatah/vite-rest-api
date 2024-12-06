import process from 'node:process'
import minimist from 'minimist'
import { app } from './app.js'

const args = minimist(process.argv.slice(2))
const PORT = args.port || 3000
const MODE = process.env.NODE_ENV || 'development'

const server = app.listen(PORT)

server.on('listening', () => {
  // @ts-ignore
  const { address, port } = server.address()
  const host = address === '::' ? 'localhost' : address

  if (!process.env.JWT_SECRET) {
    console.error('Error: JWT_SECRET is not defined')
    process.exit(1)
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    console.error('Error: JWT_REFRESH_SECRET is not defined')
    process.exit(1)
  }

  console.log(`Server is listening on ${host}:${port} in ${MODE} mode`)
})

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.on('vite:beforeFullReload', () => {
    console.log('Restarting server...')
    server.close()
  })
}
