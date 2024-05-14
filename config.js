const config = {
  host: process.env.HOST || 'http://localhost:5000',
  accessSecret: process.env.ACCESS_SECRET || 'ACCESS_SECRET',
  refreshSecret: process.env.REFRESH_SECRET || 'REFRESH_SECRET'
}

module.exports = config