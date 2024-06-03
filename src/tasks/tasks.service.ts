import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Task } from './entities/task.entity'
import { UsersService } from '../users/users.service'
import { QueueService } from '../queue/queue.service'
import { host } from '../../config.js'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private userService: UsersService,
    private queueService: QueueService
  ) {
  }

  async getAll(user) {
    return await this.tasksRepository.find({
      where: {
        userId: user.id
      }
    })
  }

  async create(user, createTaskDto) {
    let task = new Task()
    task.user = user
    task.imageUrl = `${host}/${createTaskDto.imageUrl}`

    task = await this.tasksRepository.manager.save(task)

    await this.queueService.addTasks(task.id, task.imageUrl)

    return task
  }

  async onComplete(taskId: number, classId: number) {
    let task = await this.tasksRepository.findOne({ where: { id: taskId } })
    if (!task) throw new Error('Task not found')

    task.classId = classId
    return this.tasksRepository.save(task)
  }
}
