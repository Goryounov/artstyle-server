import { forwardRef, Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'

import { QueueService } from './queue.service'
import { CALLBACKS_QUEUE_NAME, TASKS_QUEUE_NAME } from './queue.constants'
import { TasksQueueConsumer } from './consumers/tasks-queue.consumer'
import { CallbacksQueueConsumer } from './consumers/callbacks-queue.consumer'
import { TasksModule } from '../tasks/tasks.module'
import { MlModule } from '../ml/ml.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: TASKS_QUEUE_NAME
    }),
    BullModule.registerQueue({
      name: CALLBACKS_QUEUE_NAME
    }),
    forwardRef(() => TasksModule),
    MlModule
  ],
  providers: [QueueService, TasksQueueConsumer, CallbacksQueueConsumer],
  exports: [QueueService]
})

export class QueueModule {}
