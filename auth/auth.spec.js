const request = require('supertest');
const db = require('../database/dbConfig.js');

const auth = require('./auth-helper.js');
const router = require('./auth-router.js');
const server = require('../api/server.js');

describe('Testing Auth Router', () => {
	describe('/', () => {
		it('should return 401 OK', async () => {
			const res = await request(server).get('/api/auth/');
			expect(res.status).toBe(401);
		})
		it('should add two users', async () => {
			const users = await db('users');
			expect(users).toHaveLength(0);
		});
	});
	describe('/register', () => {
		it('should return 500', async () => {
			const res = await request(server).post('/api/auth/register/');
			expect(res.status).toBe(500);
		})
		it('should return 201', async () => {
			return request(server).post('/api/auth/register')
				.send({username: 'first', password: 'first'})
				.then(res => {expect(res.status).toBe(201)})
		});
	});
	describe('/login', () => {
		it('should return 500', async () => {
			const res = await request(server).post('/api/auth/login/');
			expect(res.status).toBe(500);
		})
		it('should return 201 after login', async () => {
			return request(server).post('/api/auth/login')
				.send({username: '', password: ''})
				.then(res => {expect(res.status).toBe(401)})
		});
	});
})
