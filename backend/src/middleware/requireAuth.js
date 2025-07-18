import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const requireAuth = async (req, res, next) => {
  let token = null;

  // Prefer cookie token over Authorization header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
    console.log('🔐 Token found in cookies');
  } else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('🔐 Token found in Authorization header');
  }

  if (!token) {
    console.warn('❌ No token found in cookies or Authorization header');
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-passwordHash');

    if (!req.user) {
      console.warn('❌ No user found for decoded token');
      return res.status(401).json({ error: 'User associated with token not found' });
    }

    next();
  } catch (err) {
    console.error('❌ Auth error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default requireAuth;