import request from 'supertest';
import app from '../app';

describe('Get API Endpoints', () => {
  it('should receive API working', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
  });
});
