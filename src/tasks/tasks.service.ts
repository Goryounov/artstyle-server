import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Task } from './entities/task.entity'
import { UsersService } from '../users/users.service'
import { host } from '../../config.js'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private userService: UsersService
  ) {
  }

  async getAll(user) {
    return await this.tasksRepository.find({
      where: {
        userId: user.id
      }
    });
  }

  async create(user, createTaskDto) {
    const task = new Task()
    task.user = user
    task.imageUrl = `${host}/${createTaskDto.imageUrl}`

    return this.tasksRepository.manager.save(task)
  }
}
