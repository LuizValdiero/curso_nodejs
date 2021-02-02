export default {
  mongoUrl: process.env.MONGO_URL || 'local DB',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'sDa4rwd*ds?='
}
