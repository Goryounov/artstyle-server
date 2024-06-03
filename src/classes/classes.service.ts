import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Class } from './entities/class.entity'

@Injectable()
export class ClassesService {
  constructor(@InjectRepository(Class) private classesRepository: Repository<Class>) {
  }

  async getAll() {
    return this.classesRepository.find()
  }

  async getByClassId(classId: number) {
    return this.classesRepository.findOne({
      where: { classId: classId }
    })
  }
}