import request from 'supertest';
import app from '../../src/server.js';
import Individual from '../../src/models/Individual.js';
import User from '../../src/models/User.js';
import jwt from 'jsonwebtoken';

describe('Individuals Controller', () => {
  let token;
  let user;

  beforeEach(async () => {
    await Individual.deleteMany({});
    await User.deleteMany({});
    
    user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  });

  it('should create a new individual', async () => {
    const res = await request(app)
      .post('/api/individuals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        animalId: '123',
        name: 'Test Individual',
        birthDate: new Date(),
        gender: 'female'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Test Individual');
  });

  it('should get all individuals', async () => {
    await Individual.create({
      animalId: '123',
      name: 'Test Individual',
      birthDate: new Date(),
      gender: 'female',
      userId: user._id
    });

    const res = await request(app)
      .get('/api/individuals')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
}); 