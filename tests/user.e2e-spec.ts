import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('User e2e', () => {
	it('Register error', async () => {
		const result = await request(application.app).post('/users/register').send({
			email: 'test@test.ru',
			password: '1',
		});
		expect(result.statusCode).toBe(422);
	});

	it('Login success', async () => {
		const result = await request(application.app).post('/users/login').send({
			email: 'test@test.ru',
			password: '1234',
		});
		expect(result.body.jwt).not.toBeUndefined();
	});

	it('Login success', async () => {
		const result = await request(application.app).post('/users/login').send({
			email: 'test@test.ru',
			password: 'wrong password',
		});
		expect(result.statusCode).toBe(401);
	});

	it('Info received', async () => {
		const login = await request(application.app).post('/users/login').send({
			email: 'test@test.ru',
			password: '1234',
		});
		const result = await request(application.app).get('/users/info').set('Authorization', `Bearer ${login.body.jwt}`);
		expect(result.body.email).toBe('test@test.ru');
	});

	it('Info error', async () => {
		await request(application.app).post('/users/login').send({
			email: 'test@test.ru',
			password: 'wrong password',
		});
		const result = await request(application.app).get('/users/info').set('Authorization', 'Bearer 1');
		expect(result.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
