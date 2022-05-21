import { BaseController } from '../common/base.controller'
import { NextFunction, Request, Response } from 'express'
import { HTTPError } from '../errors/http-error.class'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ILogger } from '../logger/logger.interface'
import 'reflect-metadata'
import { IUserController } from './user.conroller.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService)
    this.bindRoutes([
      {
        path: '/login',
        func: this.login,
        method: 'post',
      },
      {
        path: '/register',
        func: this.register,
        method: 'post',
      },
    ])
  }

  public login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Authorization error'))
    // this.ok(res, 'login')
  }

  public register(req: Request, res: Response) {
    this.ok(res, 'register')
  }
}
