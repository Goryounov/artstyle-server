import { Module } from '@nestjs/common'
import { CallbacksService } from './callbacks.service'
import { CallbacksController } from './callbacks.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { Callback } from './entities/callback.entity'
import { KeysModule } from '../keys/keys.module'

@Module({
  imports: [TypeOrmModule.forFeature([Callback]), JwtModule.register({}), KeysModule, UsersModule],
  controllers: [CallbacksController],
  providers: [CallbacksService],
  exports: [CallbacksService]
})
export class CallbacksModule {}
