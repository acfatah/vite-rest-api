import { describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/server.js'

describe('server', () => {
  it('should run', async () => {
    app.get("/", (req, res) => {
      res.status(200).send()
    })

    await request(app).get("/").expect(200)
  })
})