import request from 'supertest';
import express from 'express';
import { registerController, loginController } from '../../controllers/authController.js';
import userModel from '../../models/userModel.js';
import mongoose from 'mongoose';

// Create test app
const app = express();
app.use(express.json());
app.post('/register', registerController);
app.post('/login', loginController);

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  describe('POST /register', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        address: '123 Main St'
      };

      const response = await request(app)
        .post('/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User Register Successfully');
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.password).not.toBe(userData.password); // Should be hashed
    });

    test('should return error for missing name', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        address: '123 Main St'
      };

      const response = await request(app)
        .post('/register')
        .send(userData)
        .expect(200);

      expect(response.body.error).toBe('Name is Required');
    });

    test('should return error for existing user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        address: '123 Main St'
      };

      // Register first user
      await request(app).post('/register').send(userData);

      // Try to register same user again
      const response = await request(app)
        .post('/register')
        .send(userData)
        .expect(200);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Already Register please login');
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      // Register a user for login tests
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '1234567890',
        address: '123 Main St'
      };
      await request(app).post('/register').send(userData);
    });

    test('should login successfully with valid credentials', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('login successfully');
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
    });

    test('should return error for invalid email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Email is not registerd');
    });

    test('should return error for invalid password', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid Password');
    });
  });
});
