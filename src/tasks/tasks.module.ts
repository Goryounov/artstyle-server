import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { UsersModule } from '../users/users.module'
import { KeysModule } from '../keys/keys.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({}),
    TokenModule,
    KeysModule,
    UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
