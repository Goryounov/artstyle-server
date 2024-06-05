import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'

import { CallbacksService } from './callbacks.service'
import { CreateCallbackDto } from './dto/create-callback.dto'
import { UpdateCallbackDto } from './dto/update-callback.dto'
import { AuthGuard } from '../guards/auth.guard'

@Controller('callbacks')
export class CallbacksController {
  constructor(private readonly callbacksService: CallbacksService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req) {
    return this.callbacksService.getAll(req.user.id)
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createCallbackDto: CreateCallbackDto) {
    return this.callbacksService.create(req.user, createCallbackDto)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Req() req, @Param('id') id: string, @Body() updateCallbackDto: UpdateCallbackDto) {
    return this.callbacksService.update(req.user, +id, updateCallbackDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Req() req, @Param('id') id: string) {
    return this.callbacksService.delete(req.user, +id)
  }
}