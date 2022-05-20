import { BaseController } from '../common/base.controller'
import { LoggerService } from '../logger/logger.service'
import { Request, Response } from 'express'

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger)
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

  public login(req: Request, res: Response) {
    this.ok(res, 'login')
  }

  public register(req: Request, res: Response) {
    this.ok(res, 'register')
  }
}
