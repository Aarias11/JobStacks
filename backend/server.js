import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import applicationRoutes from './src/routes/applicationRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
const allowedOrigins = [
  'https://job-stacks.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.options('*', cors());
app.use(cookieParser());

// DB Connection
connectDB();

// Routes
app.use('/api/applications', applicationRoutes)
app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);


// Server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})