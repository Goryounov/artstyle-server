import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { TokenModule } from '../token/token.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { KeysModule } from '../keys/keys.module'

@Module({
  imports: [UsersModule, TokenModule, JwtModule, KeysModule],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule {}
