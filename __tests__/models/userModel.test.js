import mongoose from 'mongoose';
import userModel from '../../models/userModel.js';

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    // Close database connection
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear users collection before each test
    await userModel.deleteMany({});
  });

  test('should create a user with valid data', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword123',
      phone: '1234567890',
      address: '123 Main St'
    };

    const user = new userModel(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.phone).toBe(userData.phone);
    expect(savedUser.address).toBe(userData.address);
    expect(savedUser.role).toBe(0); // default value
    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.updatedAt).toBeDefined();
  });

  test('should require name field', async () => {
    const userData = {
      email: 'john@example.com',
      password: 'hashedPassword123',
      phone: '1234567890',
      address: '123 Main St'
    };

    const user = new userModel(userData);
    let error;

    try {
      await user.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  test('should require unique email', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashedPassword123',
      phone: '1234567890',
      address: '123 Main St'
    };

    // Save first user
    await new userModel(userData).save();

    // Try to save second user with same email
    const secondUser = new userModel({
      ...userData,
      name: 'Jane Doe'
    });

    let error;
    try {
      await secondUser.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.code).toBe(11000); // MongoDB duplicate key error
  });
});
