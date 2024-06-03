import { Injectable } from '@nestjs/common'

@Injectable()
export class MLService {
  constructor() {
  }

  getClass(taskId: number, imageUrl: string) {
    console.log('Request to ML model', taskId, imageUrl)

    return {
      taskId: taskId,
      classId: 777 // model response
    }
  }
}
