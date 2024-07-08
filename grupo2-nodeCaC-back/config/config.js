require('dotenv').config();


module.exports = {
    secretKey: process.env.JWT_SECRET || 'fallback-secret-key',
    tokenExpiresIn: '1h'
  };
