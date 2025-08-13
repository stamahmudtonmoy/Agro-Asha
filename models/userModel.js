/**
 * @fileoverview User schema and model for MongoDB
 * @author Project X
 * @version 1.0.0
 */

import mongoose from "mongoose";

/**
 * User schema definition
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * User's full name
     * @type {string}
     * @required
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },
    /**
     * User's email address (unique)
     * @type {string}
     * @required
     * @unique
     */
    email: {
      type: String,
      required: true,
      unique: true,
    },
    /**
     * User's password (hashed)
     * @type {string}
     * @required
     */
    password: {
      type: String,
      required: true,
    },
    /**
     * User's phone number
     * @type {string}
     * @required
     */
    phone: {
      type: String,
      required: true,
    },
    /**
     * User's address
     * @type {string}
     * @required
     */
    address: {
      type: String,
      required: true,
    },
    /**
     * User role (0 for user, 1 for admin)
     * @type {number}
     * @default 0
     */
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/**
 * User model
 * @type {mongoose.Model}
 */
export default mongoose.model("users", userSchema);
