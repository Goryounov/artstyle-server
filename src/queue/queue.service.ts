import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CALLBACKS_QUEUE_NAME, TASKS_QUEUE_NAME } from './queue.constants';




@Injectable()
export class QueueService {
    constructor(
        @InjectQueue(TASKS_QUEUE_NAME) private tasksQueue: Queue,
        @InjectQueue(CALLBACKS_QUEUE_NAME) private callbackQueue: Queue
    ){}


    async addTasks(taskId: number, imgUrl:string){
        await this.tasksQueue.add({
            taskId:taskId,
            imgUrl:imgUrl
        })
    }

    async addCallBackTask(url:string, classId:number){
        await this.callbackQueue.add({
            url:url,
            classId:classId
        });
    }
}