import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import loveRoutes from './routes/loveRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

/* ================================
   SECURITY MIDDLEWARE
================================ */

// Helmet for secure headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://love-compatibility-app.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow non-browser tools (Postman, curl)
    if (!origin) return callback(null, true);

    // Allow exact allowed domains
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all Vercel preview deployments
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// Rate limiting for API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

/* ================================
   BODY PARSING
================================ */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   HEALTH CHECK
================================ */

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date()
  });
});

/* ================================
   ROUTES
================================ */

app.use('/api/love', loveRoutes);

/* ================================
   ERROR HANDLER
================================ */

app.use(errorHandler);

/* ================================
   SERVER START
================================ */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
