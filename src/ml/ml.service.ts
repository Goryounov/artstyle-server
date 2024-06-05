import { Injectable } from '@nestjs/common'
import axios from 'axios'

// @ts-ignore
import { mlModelHost } from '../../config'

@Injectable()
export class MLService {
  constructor() {
  }

  async getClass(taskId: number, imageUrl: string) {
    try {
      // @ts-ignore
      const { classId } = await axios.post(`${mlModelHost}/preprocess/`, {
        taskId,
        imageUrl,
      })

      return classId
    } catch (err) {
      if (err.isAxiosError) {
        throw new Error(`Failed to get class from model: ${err.response}`)
      }
      throw new Error(`Failed to get class from model: ${err.message}`)
    }
  }
}
