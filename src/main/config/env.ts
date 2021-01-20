import mongodbAtlas from './mongodbAtlas'
export default {
  mongoUrl: process.env.MONGO_URL || mongodbAtlas(),
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'sDa4rwd*ds?='
}
