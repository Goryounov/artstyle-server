import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

import { Token } from './entities/token.entity'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
// @ts-ignore
import { accessSecret, refreshSecret } from '../config'

const ACCESS_SECRET = accessSecret
const REFRESH_SECRET = refreshSecret

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
    private userService: UsersService
  ) {
  }

  generateTokens(user: User) {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: ACCESS_SECRET
    })

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: REFRESH_SECRET
    })

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const user = await this.userService.getById(userId)
    const tokenData = await this.tokenRepository.findOne({
      where: { user: user }
    })

    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return this.tokenRepository.save(tokenData)
    }

    const token = new Token()
    token.user = user
    token.refreshToken = refreshToken
    await this.tokenRepository.save(token)

    return token
  }

  async removeToken(refreshToken: string) {
    await this.tokenRepository.delete({ refreshToken: refreshToken })
  }

  validateRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token, { secret: REFRESH_SECRET })
    } catch (e) {
      console.log('Token is invalid', token)
      throw new HttpException('Token is invalid', HttpStatus.UNAUTHORIZED)
    }
  }

  async findToken(refreshToken: string) {
    return await this.tokenRepository.findOne({
      where: { refreshToken: refreshToken },
      relations: ['user'],
    })
  }
}
