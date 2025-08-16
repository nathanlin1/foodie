import { beforeAll, afterAll, it, expect, describe } from 'vitest';
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

describe('GET /categories', () => {
  it('200 error code', async () => {
    const res = await request.get('/api/v0/categories');
    expect(res.status).toBe(200);
    console.log(res.body.categories)
    // expect(res.body.categories).toContain('Meat');
  });

  it('contains names and ids', async () => {
    const res = await request.get('/api/v0/categories');

    res.body.categories.forEach(cat => {
      expect(cat).toHaveProperty('id')
      expect(cat).toHaveProperty('name')
    })

    const names = res.body.categories.map(cat => cat.name);
    expect(names).toContain('Meat');
  });
});