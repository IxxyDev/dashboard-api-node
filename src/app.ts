import express, { Express } from 'express'
import { Server } from 'http'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'
import { ExceptionFilter } from './errors/exception.filter'

export class App {
  app: Express
  server: Server
  PORT: number
  logger: LoggerService
  userController: UserController
  exceptionFilter: ExceptionFilter

  constructor(logger: LoggerService, userController: UserController, exceptionFilter: ExceptionFilter) {
    this.app = express()
    this.PORT = 8000
    this.logger = logger
    this.userController = userController
    this.exceptionFilter = exceptionFilter
  }

  useRoutes() {
    this.app.use('/users', this.userController.router)
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init() {
    this.useRoutes()
    this.useExceptionFilters()
    this.server = this.app.listen(this.PORT)
    this.logger.log(`Server is running on http://localhost:${this.PORT}`)
  }
}
