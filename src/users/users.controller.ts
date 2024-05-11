import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!Number(id))
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    const user = await this.usersService.getById(+id)
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    return user
  }
}
