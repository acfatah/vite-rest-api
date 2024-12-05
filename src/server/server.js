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
