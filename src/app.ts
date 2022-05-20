import express, { Express } from 'express'
import { Server } from 'http'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'

export class App {
  app: Express
  server: Server
  PORT: number
  logger: LoggerService
  userController: UserController

  constructor(logger: LoggerService, userController: UserController) {
    this.app = express()
    this.PORT = 8000
    this.logger = logger
    this.userController = userController
  }

  useRoutes() {
    this.app.use('/users', this.userController.router)
  }

  public async init() {
    this.useRoutes()
    this.server = this.app.listen(this.PORT)
    this.logger.log(`Server is running on http://localhost:${this.PORT}`)
  }
}
