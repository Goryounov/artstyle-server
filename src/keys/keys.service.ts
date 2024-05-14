import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'

import { CreateKeyDto } from './dto/create-key.dto'
import { UpdateKeyDto } from './dto/update-key.dto'
import { Key } from './entities/key.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Key) private keysRepository: Repository<Key>,
  ) {
  }

  async getAll(user) {
    return this.keysRepository.find({
      where: {
        userId: user.id
      }
    })
  }

  create(user, createKeyDto: CreateKeyDto) {
    const key = new Key()
    key.user = user
    key.name = createKeyDto.name
    key.key = uuidv4()

    return this.keysRepository.save(key)
  }

  getByKey(key: string): Promise<Key | null> {
    return this.keysRepository.findOne({
      where: { key }
    })
  }

  delete(user, id: number) {
    return this.keysRepository.delete({ id, userId: user.id })
  }
}
