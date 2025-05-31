import { describe, it, expect, beforeEach } from '@jest/globals';
import Animal from '../../src/models/Animal.js';
import User from '../../src/models/User.js';

describe('Animal Model', () => {
  let testUser;

  beforeEach(async () => {
    await Animal.deleteMany({});
    await User.deleteMany({});
    
    // Skapa en testanvändare för att använda dess ID
    testUser = await User.create({
      email: 'animal-test@example.com',
      password: 'password123'
    });
  });

  it('should create a new animal', async () => {
    const animal = await Animal.create({
      name: 'Test Animal',
      type: 'cow',
      age: 5,
      userId: testUser._id
    });

    expect(animal).toHaveProperty('name', 'Test Animal');
    expect(animal).toHaveProperty('type', 'cow');
    expect(animal).toHaveProperty('age', 5);
    expect(animal.userId.toString()).toBe(testUser._id.toString());
  });
}); 