import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import {BullModule}from '@nestjs/bull';
import { TasksQueueConsumer } from './consumers/tasks-queue.consumer';
import { TasksModule } from 'src/tasks/tasks.module';
import { CALLBACKS_QUEUE_NAME, TASKS_QUEUE_NAME } from './queue.constants';
import { CallbacksQueueConsumer } from './consumers/callbacks-queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name:TASKS_QUEUE_NAME
    }),
    BullModule.registerQueue({
      name:CALLBACKS_QUEUE_NAME
    }),
    TasksModule
  ],
  providers: [QueueService,TasksQueueConsumer,CallbacksQueueConsumer],
  exports: [QueueService]
})
export class QueueModule {}
