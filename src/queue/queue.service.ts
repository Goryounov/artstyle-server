import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

import { CALLBACKS_QUEUE_NAME, TASKS_QUEUE_NAME } from './queue.constants'

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(TASKS_QUEUE_NAME) private tasksQueue: Queue,
    @InjectQueue(CALLBACKS_QUEUE_NAME) private callbackQueue: Queue
  ) {
  }

  async addTasks(taskId: number, imageUrl: string) {
    return this.tasksQueue.add({
      taskId,
      imageUrl
    })
  }

  async addCallback(userId: number, taskId: number, classId: number) {
    await this.callbackQueue.add({
      userId,
      taskId,
      classId
    })
  }
}