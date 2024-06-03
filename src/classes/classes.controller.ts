import { Controller, Get, UseGuards } from '@nestjs/common'

import { ClassesService } from './classes.service'
import { AuthGuard } from '../guards/auth.guard'

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.classesService.getAll()
  }
}