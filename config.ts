const config = {
  host: process.env.HOST || 'http://localhost:5001',
  accessSecret: process.env.ACCESS_SECRET || 'ACCESS_SECRET',
  refreshSecret: process.env.REFRESH_SECRET || 'REFRESH_SECRET',
  mlModelHost: process.env.ML_MODE_HOST || 'http://localhost:8000'
}

module.exports = config