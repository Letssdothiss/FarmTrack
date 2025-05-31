import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Använd test-databasen
process.env.MONGODB_URI = process.env.MONGODB_URI.replace(
  /\/[^/]+$/,
  '/test'
);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
}); 