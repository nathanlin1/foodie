import { beforeAll, afterAll, it, expect } from 'vitest';
import supertest from 'supertest';
import http from 'http';
import { testItems } from './data/testItems.js';

import app from '../src/server.js';
import supabase from '../src/db.js';

let server;
let request;

async function resetTestData() {
  await supabase.from('items').delete().neq('id', 0);
  await supabase.from('items').insert(testItems);
}

beforeAll(async () => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  await resetTestData();
});

afterAll(async () => {
  await server.close();
});

it('GET categories/items/999 returns 404', async () => {
  const res = await request.get('/api/v0/categories/items/999');
  expect(res.status).toBe(404);
});

it('GET categories/items/1 returns beef and lamb', async () => {
  const res = await request.get('/api/v0/categories/items/1');
  expect(res.status).toBe(200);
  expect(res.body.items).toContain('Beef');
  expect(res.body.items).toContain('Lamb');
});

