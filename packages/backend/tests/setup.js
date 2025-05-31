import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { beforeAll, afterAll, afterEach } from '@jest/globals';
import path from 'path';

// Ladda test-miljövariabler
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

// Använd test-databasen
const defaultUri = 'mongodb://localhost:27017/farmtrack';
const originalUri = process.env.MONGODB_URI || defaultUri;
const testUri = originalUri.replace(/\/[^/]+$/, '/test');
process.env.MONGODB_URI = testUri;

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