import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AuthGuard } from '../guards/auth.guard'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req) {
    return this.tasksService.getAll(req.user)
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('Images', 100, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  }))

  uploadImages(@Req() req, @UploadedFiles() files) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded')
    }

    return files.reduce(async (promiseChain: any, file: { path: any }) => {
      const chainResults = await promiseChain
      const result = await this.tasksService.create(req.user, { imageUrl: file.path })
      return [...chainResults, result];
    }, Promise.resolve([]))
  }
}
