/**
 * User schema
 * @author Yousuf Kalim
 */
import { model, Schema, Document } from 'mongoose';
import User from '@interfaces/users.interface';

// Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    number: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },
    address: String,
    city: String,
    country: String,
    photo: String,
  },
  {
    timestamps: true,
  },
);

// Model
export default model<User & Document>('User', userSchema);
