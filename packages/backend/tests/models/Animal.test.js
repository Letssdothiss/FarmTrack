import Animal from '../../src/models/Animal.js';

describe('Animal Model', () => {
  beforeEach(async () => {
    await Animal.deleteMany({});
  });

  it('should create a new animal', async () => {
    const animal = await Animal.create({
      species: 'cattle',
      name: 'Test Animal'
    });

    expect(animal).toHaveProperty('species', 'cattle');
    expect(animal).toHaveProperty('name', 'Test Animal');
  });
}); 