import { Logger } from '@nestjs/common'
import { Process, Processor, OnQueueError } from '@nestjs/bull'
import { Job } from 'bull'

import { TasksService } from '../../tasks/tasks.service'
import { MLService } from '../../ml/ml.service'
import { TASKS_QUEUE_NAME } from '../queue.constants'

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
    this.logger.log(`Process task id: ${taskId}, image: ${imageUrl}`)

    let status: string
    let classId: number
    try {
      classId = await this.mlService.getClass(taskId, imageUrl)
      status = 'completed'
    } catch (err) {
      this.logger.log(`[taskId: ${taskId}]`, err.message)
      status = 'failed'
    } finally {
      await this.tasksService.onComplete(taskId, status, classId)
    }
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.log(
      `${error}`,
    )
  }
}