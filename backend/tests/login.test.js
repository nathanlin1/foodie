import { beforeAll, afterAll, it, describe, expect } from 'vitest';
import supertest from 'supertest';
import http from 'http';

import app from '../src/server.js';

let server;
let request;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
});

afterAll(async () => {
  await server.close();
});

describe('POST /login endpoint', () => {
    it('returns 200 with good credentials', async () => {
        const credentials = {
            'email': 'anna@books.com',
            'password': 'annaadmin',
        };

        await request.post(`/api/v0/login`).send(credentials).expect(200);
    });

    it('returns 401 with bad email', async () => {
        const credentials = {
            'email': 'anna@email.com',
            'password': 'annaadmin',
        };

        await request.post(`/api/v0/login`).send(credentials).expect(401);
    });

    it('returns 401 with bad password', async () => {
        const credentials = {
            'email': 'anna@books.com',
            'password': 'password',
        };

        await request.post(`/api/v0/login`).send(credentials).expect(401);
    });

    it('returns 401 with no credentials', async () => {
        const credentials = {
            'email': '',
            'password': '',
        };

        await request.post(`/api/v0/login`).send(credentials).expect(401);
    });
});

describe('GET /login/google', () => {
  it('should respond with a Google OAuth URL', async () => {
    const res = await request.get('/api/v0/login/google');
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toBeDefined();
    expect(res.body.url).toMatch(/^https:\/\/.*provider=google/);
  });
});