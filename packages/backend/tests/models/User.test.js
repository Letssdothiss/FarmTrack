import User from '../../src/models/User.js';

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });

    expect(user).toHaveProperty('email', 'test@example.com');
    expect(user).toHaveProperty('firstName', 'Test');
    expect(user).toHaveProperty('lastName', 'User');
    expect(user.password).not.toBe('password123'); // Password should be hashed
  });

  it('should not create user with duplicate email', async () => {
    await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });

    await expect(User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test2',
      lastName: 'User2'
    })).rejects.toThrow();
  });
}); 