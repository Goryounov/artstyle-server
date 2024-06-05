const config = {
  host: process.env.HOST || 'http://192.168.199.235:5001',
  accessSecret: process.env.ACCESS_SECRET || 'ACCESS_SECRET',
  refreshSecret: process.env.REFRESH_SECRET || 'REFRESH_SECRET',
  mlModelHost: 'http://192.168.199.235:81'
}

module.exports = config