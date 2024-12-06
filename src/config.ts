const config = {
  host: process.env.HOST || 'http://localhost:8000',
  accessSecret: process.env.ACCESS_SECRET || 'ACCESS_SECRET',
  refreshSecret: process.env.REFRESH_SECRET || 'REFRESH_SECRET',
  mlModelHost: process.env.ML_MODEL_HOST || 'http://localhost:8080',
}

module.exports = config