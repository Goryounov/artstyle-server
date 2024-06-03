import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { UsersModule } from './users/users.module'
import { TokenModule } from './token/token.module'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './tasks/tasks.module'
import { KeysModule } from './keys/keys.module'
import { CallbacksModule } from './callbacks/callbacks.module'
import { BullModule } from '@nestjs/bull'
import { QueueModule } from './queue/queue.module'
import { MlModule } from './ml/ml.module'
import { ClassesModule } from './classes/classes.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10)
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    UsersModule,
    TokenModule,
    AuthModule,
    TasksModule,
    QueueModule,
    KeysModule,
    CallbacksModule,
    MlModule,
    ClassesModule
  ],
})

export class AppModule {}