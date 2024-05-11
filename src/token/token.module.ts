import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { TokenService } from './token.service'
import { Token } from './token.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token]),
    UsersModule,
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
