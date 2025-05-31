import { describe, it, expect, beforeEach } from '@jest/globals';
import Individual from '../../src/models/Individual.js';
import User from '../../src/models/User.js';
// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';

describe('Individual Model', () => {
  let testUser;

  beforeEach(async () => {
    await Individual.deleteMany({});
    await User.deleteMany({});
    
    // Skapa en testanvändare för att använda dess ID
    testUser = await User.create({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should create a new individual', async () => {
    const individual = await Individual.create({
      name: 'Test Individual',
      animalType: 'cattle',
      userId: testUser._id
    });

    expect(individual).toHaveProperty('name', 'Test Individual');
    expect(individual).toHaveProperty('animalType', 'cattle');
    expect(individual.userId.toString()).toBe(testUser._id.toString());
  });
}); 