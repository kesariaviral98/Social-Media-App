require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT) || 5000,
  frontendUrl: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
};
