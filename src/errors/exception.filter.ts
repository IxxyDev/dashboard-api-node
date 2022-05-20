import { Request, Response } from 'express'
import { LoggerService } from '../logger/logger.service'
import { IExceptionFilter } from './exception.filter.interface'
import { HTTPError } from './http-error.class'

export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService

  constructor(logger: LoggerService) {
    this.logger = logger
  }

  catch(error: Error | HTTPError, req: Request, res: Response) {
    console.log(typeof error)
    if (error instanceof HTTPError) {
      console.log('HTTP ERROR')
      this.logger.error(`[${error.context}] Error: ${error.statusCode} ${error.message}`)
      res.status(error.statusCode).send({ error: error.message })
    } else {
      this.logger.error(`${error.message}`)
      res.status(500).send({ error: error.message })
    }
  }
}
