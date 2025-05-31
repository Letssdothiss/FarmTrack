import request from 'supertest';
import app from '../../src/server.js';
import User from '../../src/models/User.js';
import jwt from 'jsonwebtoken';

describe('Auth Middleware', () => {
  let token;
  let user;

  beforeEach(async () => {
    await User.deleteMany({});
    user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  it('should allow access with valid token', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should deny access without token', async () => {
    const res = await request(app)
      .get('/api/users/me');

    expect(res.status).toBe(401);
  });
}); 