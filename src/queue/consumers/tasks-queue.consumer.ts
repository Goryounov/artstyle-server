import { Logger } from '@nestjs/common'
import { Process, Processor, OnQueueError } from '@nestjs/bull'
import { Job } from 'bull'

import { TasksService } from '../../tasks/tasks.service'
import { TASKS_QUEUE_NAME } from '../queue.constants'
import { MLService } from '../../ml/ml.service'

@Processor(TASKS_QUEUE_NAME)
export class TasksQueueConsumer {
  constructor(
    private readonly tasksService: TasksService,
    private readonly mlService: MLService
  ) {
  }

  private readonly logger = new Logger(TasksQueueConsumer.name)

  @Process()
  async process(job: Job) {
    const { taskId, imageUrl } = job.data

    this.logger.log(
      `process task\nid: ${taskId}\nimage: ${imageUrl}`
    );

    const { classId } = this.mlService.getClass(taskId, imageUrl)
    await this.tasksService.onComplete(taskId, classId)

    return {}
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.log(
      `${error}`
    )
  }
}