import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/user.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	PORT: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.PORT = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.PORT);
		this.logger.log(`Server is running on http://localhost:${this.PORT}`);
	}
}
