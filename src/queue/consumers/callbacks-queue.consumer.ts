import { OnQueueError, Process, Processor } from "@nestjs/bull";
import { CALLBACKS_QUEUE_NAME } from "../queue.constants";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor(CALLBACKS_QUEUE_NAME)
export class CallbacksQueueConsumer{
    private readonly logger=new Logger(CallbacksQueueConsumer.name);

    @Process()
    async process(job:Job){

        //callback server

        return{}
    }

    @OnQueueError()
    onError(error: Error){
        this.logger.log(
            `${error}`
        );
    }
}