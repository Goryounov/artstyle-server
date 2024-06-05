import { OnQueueError, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { CallbacksService } from '../../callbacks/callbacks.service'
import axios from 'axios'

import { CALLBACKS_QUEUE_NAME } from '../queue.constants'

@Processor(CALLBACKS_QUEUE_NAME)
export class CallbacksQueueConsumer {
  constructor(private readonly callbacksService: CallbacksService) {
  }

  private readonly logger = new Logger(CallbacksQueueConsumer.name)

  @Process()
  async process(job: Job) {
    const { userId, taskId, classId } = job.data
    this.logger.log(`Process task id: ${taskId}, userId: ${userId}, classId: ${classId}`)

    const callbacksServers = await this.callbacksService.getAll(userId)
    for (const callbackServer of callbacksServers) {
      try {
        const res = (await axios.post(callbackServer.url, {
            taskId,
            classId
          }, {
          // @ts-ignore
            'Authorization': `Bearer ${callbackServer.secret}`
          }
        )).data
        this.logger.log(`Callback server response, [id: ${callbackServer.id}]: ${res}`)
      } catch (err) {
        this.logger.log(`Callback server request error, [id: ${callbackServer.id}], [taskId: ${taskId}]: ${err.message}`)
      }
    }
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.log(
      `${error}`
    )
  }
}