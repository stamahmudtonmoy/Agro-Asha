import { hashPassword, comparePassword } from '../../helpers/authHelper.js';

describe('Auth Helper Functions', () => {
  describe('hashPassword', () => {
    test('should hash a password correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    test('should throw error for invalid input', async () => {
      await expect(hashPassword(null)).rejects.toThrow();
    });
  });

  describe('comparePassword', () => {
    test('should return true for matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      const result = await comparePassword(password, hashedPassword);
      expect(result).toBe(true);
    });

    test('should return false for non-matching passwords', async () => {
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword123';
      const hashedPassword = await hashPassword(password);
      
      const result = await comparePassword(wrongPassword, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
