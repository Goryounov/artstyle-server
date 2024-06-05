import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'
import { UsersModule } from '../users/users.module'
import { KeysModule } from '../keys/keys.module'
import { TokenModule } from '../token/token.module'
import { QueueModule } from '../queue/queue.module'
import { SocketsModule } from '../sockets/sockets.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    JwtModule.register({}),
    forwardRef(() => QueueModule),
    TokenModule,
    KeysModule,
    UsersModule,
    SocketsModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})

export class TasksModule {}
