import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { TokenModule } from '../token/token.module'
import { KeysModule } from '../keys/keys.module'
import { UsersModule } from '../users/users.module'
import { ClassesService } from './classes.service'
import { ClassesController } from './classes.controller'
import { Class } from './entities/class.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    JwtModule.register({}),
    TokenModule,
    KeysModule,
    UsersModule
  ],
  controllers: [ClassesController],
  providers: [ClassesService]
})
export class ClassesModule {}
