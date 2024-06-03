import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User()
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.email = createUserDto.email
    user.password = createUserDto.password

    return await this.usersRepository.manager.save(user)
  }

  async getById(id: number) {
    return await this.usersRepository.findOne({
      where: { id: id },
    })
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email: email } })
  }
}
