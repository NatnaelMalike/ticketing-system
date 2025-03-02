import mongoose from 'mongoose';
import { dbUri } from './config';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri as string);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;