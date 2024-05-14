import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { KeysService } from './keys.service'
import { CreateKeyDto } from './dto/create-key.dto'
import { AuthGuard } from '../guards/auth.guard'

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req) {
    return this.keysService.getAll(req.user)
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req, @Body() createKeyDto: CreateKeyDto) {
    return this.keysService.create(req.user, createKeyDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Req() req, @Param('id') id: string) {
    return this.keysService.delete(req.user, +id)
  }
}