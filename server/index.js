import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

// Configure dotenv to look for .env in the root directory
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI;
console.log("🔍 MONGODB_URI:", MONGODB_URI);

if (!MONGODB_URI) {
  console.error("❌ MongoDB URI is missing! Check your .env file");
  process.exit(1);
}

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 60000,
  connectTimeoutMS: 60000,
  // dbName: 'knowngrow'
};

// MongoDB connection with retry mechanism and proper error handling
const connectDB = async (retries = 5) => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    
    const conn = await mongoose.connect(MONGODB_URI, mongooseOptions);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Set up connection event handlers
    mongoose.connection.on('error', err => {
      console.error('❌ MongoDB connection error:', err);
      if (!mongoose.connection.readyState) {
        console.log("🔄 Attempting to reconnect...");
        setTimeout(() => connectDB(), 5000);
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.log("❌ MongoDB disconnected");
      if (!mongoose.connection.readyState) {
        console.log("🔄 Attempting to reconnect...");
        setTimeout(() => connectDB(), 5000);
      }
    });

    mongoose.connection.on('connected', () => {
      console.log("✅ MongoDB connected");
    });

    mongoose.connection.on('reconnected', () => {
      console.log("✅ MongoDB reconnected");
    });

    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    
    if (retries > 0) {
      console.log(`🔄 Retrying connection... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectDB(retries - 1);
    }
    
    console.error("❌ Failed to connect to MongoDB after multiple attempts");
    process.exit(1);
  }
};

// Start server only after successful MongoDB connection
const startServer = async () => {
  try {
    console.log("🚀 Running startServer()...");

    await connectDB();

    console.log("✅ MongoDB connected. Now starting Express server...");

    // Setup routes
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Handle process events
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('💤 MongoDB connection closed.');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('💤 MongoDB connection closed.');
  process.exit(0);
});

process.on('uncaughtException', async (err) => {
  console.error('❌ Uncaught Exception:', err);
  await mongoose.connection.close();
  process.exit(1);
});

process.on('unhandledRejection', async (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  await mongoose.connection.close();
  process.exit(1);
});

// Start the server
console.log("🚀 Starting server...");
startServer();