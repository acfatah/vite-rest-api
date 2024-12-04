import process from 'node:process'
import minimist from 'minimist'
import { app } from './app.js'

const args = minimist(process.argv.slice(2))
const PORT = args.port || 3000

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// @ts-ignore
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.on('vite:beforeFullReload', async () => {
    console.info('Restarting server...')
    await server.close()
  })
}
