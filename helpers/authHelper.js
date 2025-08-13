/**
 * @fileoverview Authentication helper functions for password hashing and comparison
 * @author Project X
 * @version 1.0.0
 */

import bcrypt from "bcrypt";

/**
 * Hash a password using bcrypt
 * @async
 * @function hashPassword
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 * @throws {Error} When hashing fails
 */
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error; // Add proper error handling
  }
};

/**
 * Compare a plain text password with a hashed password
 * @async
 * @function comparePassword
 * @param {string} password - Plain text password to compare
 * @param {string} hashedPassword - Hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
