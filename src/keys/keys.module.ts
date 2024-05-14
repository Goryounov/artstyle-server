import { Module } from '@nestjs/common'
import { KeysService } from './keys.service'
import { KeysController } from './keys.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Key } from './entities/key.entity'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Key]), JwtModule.register({}), UsersModule],
  controllers: [KeysController],
  providers: [KeysService],
  exports: [KeysService]
})
export class KeysModule {}
