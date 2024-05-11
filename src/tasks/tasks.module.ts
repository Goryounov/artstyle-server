import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './entities/task.entity'

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task]), JwtModule.register({})],
  exports: [TasksService],
})
export class TasksModule {}
