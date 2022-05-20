import { Request, Response } from 'express'

export interface IExceptionFilter {
  catch: (err: Error, req: Request, res: Response) => void
}
