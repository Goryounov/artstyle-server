import { Controller, Get, UseGuards } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.tasksService.getAll()
  }
}
