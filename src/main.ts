import { App } from './app'
import { LoggerService } from './logger/logger.service'
import { UserController } from './users/users.controller'
import { ExceptionFilter } from './errors/exception.filter'
import { Container } from 'inversify'
import { ILogger } from './logger/logger.interface'
import { TYPES } from '../types'
import { IExceptionFilter } from './errors/exception.filter.interface'

// const logger = new LoggerService()
// const app = new App(logger, new UserController(logger), new ExceptionFilter(logger))
export const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Application).to(App)

export const app = appContainer.get<App>(TYPES.Application)
app.init()
