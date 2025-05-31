import { describe, it, expect, beforeEach } from '@jest/globals';
import User from '../../src/models/User.js';
import mongoose from 'mongoose';

describe('User Model', () => {
  beforeEach(async () => {
    // Rensa alla collections i test-databasen
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
    // Återskapa indexes
    await User.createIndexes();
  });

  it('should create a new user', async () => {
    const user = await User.create({
      email: 'test1@example.com',
      password: 'password123'
    });

    expect(user).toHaveProperty('email', 'test1@example.com');
  });

  it('should hash password before saving', async () => {
    const user = await User.create({
      email: 'test2@example.com',
      password: 'password123'
    });

    expect(user.password).not.toBe('password123');
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);
  });

  it('should not create user with duplicate email', async () => {
    await User.create({
      email: 'test3@example.com',
      password: 'password123'
    });

    let error;
    try {
      await User.create({
        email: 'test3@example.com',
        password: 'password123'
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // MongoDB duplicate key error code
  });
}); 