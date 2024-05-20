import { Process, Processor, OnQueueError } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job} from "bull";
import { TasksService } from "src/tasks/tasks.service";
import { TASKS_QUEUE_NAME } from "../queue.constants";

@Processor(TASKS_QUEUE_NAME)
export class TasksQueueConsumer{

    private readonly logger=new Logger(TasksQueueConsumer.name);
    constructor(
        private readonly tasksService:TasksService
    ){}

    @Process()
    async process(job:Job){

        //load image using job.data.imgUrl
        //request to ml controler
        this.logger.log(
            `process task\nid: ${job.data.taskId}\nimage: ${job.data.imgUrl}`
        );
        //wait for response from ml controler

        //this.tasksService.complite()


        return{}
    }

    @OnQueueError()
    onError(error: Error){
        this.logger.log(
            `${error}`
        );
    }
}