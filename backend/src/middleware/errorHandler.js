// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message || err);

  res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
    error: err.message || 'Internal Server Error',
  });
};

export default errorHandler;