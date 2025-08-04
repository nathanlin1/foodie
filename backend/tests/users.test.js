import { beforeAll, afterAll, it, expect, describe } from 'vitest';
import supertest from 'supertest';
import http from 'http';

import app from '../src/server.js';

let server;
let request;
let token;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);

  const credentials = {
    'email': 'anna@books.com',
    'password': 'annaadmin',
 };

 const loginRes = await request.post(`/api/v0/login`).send(credentials)
 token = loginRes.body.token;
});

afterAll(async () => {
  await server.close();
});

describe('GET /user endpoint', () => {
    it('returns 401 without token', async () => {
        const res = await request
            .get(`/api/v0/user`)
            .set('Authorization', `Bearer `);

        expect(res.status).toBe(401);
    });

    it('returns 401 with bad token', async () => {
        const badToken = "123"
        const res = await request
            .get(`/api/v0/user`)
            .set('Authorization', `Bearer ${badToken}`);
        expect(res.status).toBe(401);
    });

    it('returns 200 with good token', async () => {
        const res = await request
            .get(`/api/v0/user`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });

    it('returns id, email, last sign in', async () => {
        const res = await request
            .get(`/api/v0/user`)
            .set('Authorization', `Bearer ${token}`);
            
        expect(res.body.user.id).toBeTruthy()
        expect(res.body.user.email).toBeTruthy()
        expect(res.body.user.last_sign_in_at).toBeTruthy()
    });
});