import Individual from '../../src/models/Individual.js';

describe('Individual Model', () => {
  beforeEach(async () => {
    await Individual.deleteMany({});
  });

  it('should create a new individual', async () => {
    const individual = await Individual.create({
      animalId: '123',
      name: 'Test Individual',
      birthDate: new Date(),
      gender: 'female'
    });

    expect(individual).toHaveProperty('animalId', '123');
    expect(individual).toHaveProperty('name', 'Test Individual');
    expect(individual).toHaveProperty('gender', 'female');
  });
}); 