import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../backend/src/config/db.js';
import applicationRoutes from '../backend/src/routes/applicationRoutes.js'
import authRoutes from '../backend/src/routes/authRoutes.js'
import aiRoutes from '../backend/src/routes/aiRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // your frontend
  credentials: true
}));
app.use(cookieParser());

// DB Connection
connectDB();

// Routes
app.use('/api/applications', applicationRoutes)
app.use('/api/users', authRoutes);
app.use('/api/ai', aiRoutes);


// Server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})