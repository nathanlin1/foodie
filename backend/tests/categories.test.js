import { beforeAll, afterAll, it, expect } from 'vitest';
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

it('GET categories returns categories', async () => {
  const res = await request.get('/api/v0/categories');
  expect(res.status).toBe(200);
  expect(res.body.categories).toContain('Meat');
});