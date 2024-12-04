import express from 'express'
import minimist from 'minimist'

const args = minimist(process.argv.slice(2))
const PORT = args.port || 3000

export const app = express()

app.get('/', (req, res) => {
  res.status(200).send()
})

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
