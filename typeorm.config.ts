import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'

config()
const configService = new ConfigService()

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/database/migrations/*.js']
})