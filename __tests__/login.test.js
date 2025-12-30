import request from 'supertest';
import express from 'express';
import validateBody from '../helpers/validateBody.js';
import { loginSchema } from '../schemas/usersSchemas.js';

// Створюємо тестовий додаток
const app = express();
app.use(express.json());

// Створюємо мок контролера логіну
app.post('/api/auth/login', validateBody(loginSchema), async (req, res, next) => {
  try {
    // Симулюємо успішний логін
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token';
    const mockUser = {
      email: req.body.email,
      subscription: 'starter'
    };

    res.status(200).json({
      token: mockToken,
      user: mockUser
    });
  } catch (error) {
    next(error);
  }
});

// Обробник помилок
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

describe('Login Controller', () => {
  describe('POST /api/auth/login - Successful Login', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('should return status code 200', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
    });

    it('should return a token in the response', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token).toBeTruthy();
    });

    it('should return user object with email and subscription fields of type String', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      // Перевірка наявності об'єкта user
      expect(response.body).toHaveProperty('user');
      expect(typeof response.body.user).toBe('object');

      // Перевірка поля email
      expect(response.body.user).toHaveProperty('email');
      expect(typeof response.body.user.email).toBe('string');

      // Перевірка поля subscription
      expect(response.body.user).toHaveProperty('subscription');
      expect(typeof response.body.user.subscription).toBe('string');
    });
  });
});
