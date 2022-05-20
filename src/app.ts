import express, { Express } from 'express'
import { userRouter } from './users/users'
import { Server } from 'http'

export class App {
  app: Express
  server: Server
  PORT: number

  constructor() {
    this.app = express()
    this.PORT = 8000
  }

  useRoutes() {
    this.app.use('/users', userRouter)
  }

  public async init() {
    this.useRoutes()
    this.server = this.app.listen(this.PORT)
    console.log(`Server is running on http://localhost:${this.PORT}`)
  }
}
