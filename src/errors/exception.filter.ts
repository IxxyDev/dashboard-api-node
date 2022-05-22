import { Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(error: Error | HTTPError, req: Request, res: Response): void {
		console.log(typeof error);
		if (error instanceof HTTPError) {
			console.log('HTTP ERROR');
			this.logger.error(`[${error.context}] Error: ${error.statusCode} ${error.message}`);
			res.status(error.statusCode).send({ error: error.message });
		} else {
			this.logger.error(`${error.message}`);
			res.status(500).send({ error: error.message });
		}
	}
}
