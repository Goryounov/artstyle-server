import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Task, TaskStatus } from './entities/task.entity'
import { UsersService } from '../users/users.service'
import { QueueService } from '../queue/queue.service'
import { SocketsGateway } from '../sockets/sockets.gateway'
// @ts-ignore
import { host } from '../../config'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private userService: UsersService,
    private queueService: QueueService,
    private readonly socketsGateway: SocketsGateway
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

  async onComplete(taskId: number, status: string, classId: number) {
    let task = await this.tasksRepository.findOne({ where: { id: taskId } })
    if (!task) throw new Error('Task not found')

    task.status = <TaskStatus>status
    task.classId = classId
    task = await this.tasksRepository.save(task)

    this.socketsGateway.sendMessage('task-updated', {
      taskId,
      classId,
      status
    })
  }
}
