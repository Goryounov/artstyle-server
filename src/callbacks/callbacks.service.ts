import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateCallbackDto } from './dto/create-callback.dto'
import { UpdateCallbackDto } from './dto/update-callback.dto'
import { Callback } from './entities/callback.entity'
import { CreateKeyDto } from '../keys/dto/create-key.dto';
import { Key } from '../keys/entities/key.entity';

@Injectable()
export class CallbacksService {
  constructor(
    @InjectRepository(Callback) private callbacksRepository: Repository<Callback>,
  ) {
  }

  async getAll(user) {
    return this.callbacksRepository.find({
      where: {
        userId: user.id
      }
    })
  }

  create(user, createCallbackDto: CreateCallbackDto) {
    const callback = new Callback()
    callback.user = user
    callback.url = createCallbackDto.url
    callback.secret = createCallbackDto.secret

    return this.callbacksRepository.save(callback)
  }

  update(user, id: number, updateCallbackDto: UpdateCallbackDto) {
    return `This action updates a #${id} callback`;
  }

  delete(user, id: number) {
    return `This action removes a #${id} callback`;
  }
}
