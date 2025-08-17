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

app.use(cors({
  origin: 'https://job-stacks.vercel.app',
  credentials: true
}));

// ✅ FIXED: removed the invalid '*' pattern
// If you want to explicitly handle OPTIONS for all routes, use:
app.options('/:path(*)', cors({
  origin: 'https://job-stacks.vercel.app',
  credentials: true
}));

app.use(cookieParser());

// DB Connection
connectDB();

// Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    pid: process.pid,
    uptime: process.uptime(),
    node: process.version,
    env: process.env.NODE_ENV || 'unknown'
  });
});


// Server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
